const express = require('express')
const router = express.Router()
const {Booking,Spot,Image,User}= require('../../db/models')
const {  requireAuth  } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require('sequelize');


//get all current user's booking

router.get('/', requireAuth, async(req,res) => {
    const bookings = await Booking.findAll({
            where:{userId:req.user.id},
            include:[{model:Spot, attributes:{exclude:['createdAt','updatedAt']}}]
    })
    for(let i=0; i<bookings.length; i++){
        let previewImage = await Image.findOne({where:{spotId:bookings[i].spotId}})
        bookings[i].dataValues.Spot.dataValues.previewImage = previewImage.image
    }
    return res.status(200).json(bookings)
})

router.get('/:spotId',requireAuth,async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
          })
    }
    let bookings
    if(req.user.id === spot.ownerId){
         bookings = await Booking.findAll({
            where:{spotId: req.params.spotId,},
            attributes:{exclude:['createdAt','updatedAt']},
            include:[{model:User}]
        })
        return  res.status(200).json(bookings)
    }else{
         bookings = await Booking.findAll({
            where:{spotId: req.params.spotId},
            attributes:{exclude:['userId']}
        })
        return  res.status(200).json(bookings)
    }

})

// create booking for spot
router.post('/:spotId', requireAuth, async(req,res)=> {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
          })
    }
    if(spot.ownerId === req.user.id){
        return res.status(403).json({
            message: "Owner can not book this place",
            statusCode: 403
        })
    }
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    let date = `${year}-${month}-${day}`

    const existingBooking = await Booking.findOne({where:{[Op.and]: [{spotId:spot.id}, {startDate:date}]}})
    if(existingBooking){
        return res.status(404).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking"
            }
        })
    }
    let newBooking = await Booking.create({
        spotId:req.params.spotId,
        userId:req.user.id,
        startDate:date,
        endDate:date
    })
    return res.status(200).json(newBooking)
})
const validateBooking = [
    check("startDate")
       .exists({ checkFalsy: true })
       .isString()
       .withMessage('Date should be string format'),
    check("startDate")
       .isISO8601('yyyy-mm-dd').toDate()
       .withMessage('Date should be in date format'),
    check("endDate")
       .exists({ checkFalsy: true })
       .isString()
       .withMessage('Date should be string format'),
    check("endDate")
       .isISO8601('yyyy-mm-dd').toDate()
       .withMessage('Date should be in date format'),

    handleValidationErrors
]

//edit booking
router.put('/:bookingId', requireAuth , validateBooking, async(req,res)=> {
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    const {startDate,endDate} = req.body
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    let date = `${year}-${month}-${day}`
    let sDate = new Date(startDate)
    let nowDate= new Date(date)
    if(sDate < nowDate){
        return res.status(400).json({
            message: "Past bookings can't be modified",
            statusCode: 400
          })
    }
    if(booking.userId === req.user.id){
       const updatedBooking = await booking.update({
          startDate, endDate
       })
       res.status(200).json(updatedBooking)
    }
    return res.status(401).json({
        message: "Unauthorised!",
        statusCode: 401
    })
})

//delete booking
router.delete('/:bookingId', requireAuth, async(req,res) =>{
    let booking = await Booking.findByPk(req.params.bookingId)
    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    let date = `${year}-${month}-${day}`

    let sDate = new Date(booking.startDate)
    let nowDate= new Date(date)
    if(sDate < nowDate ){
        return res.status(400).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 400
          })
    }
    let spot = await Spot.findByPk(booking.spotId)
    if(booking.userId === req.user.id || spot.ownerId === req.user.id ){
         await booking.destroy()
         return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
          })
    }
    return res.status(401).json({
        message:'Unauthorised',
        stausCode:401
    })
})
module.exports = router
