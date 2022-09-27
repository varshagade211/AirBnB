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
            include:[{model:Spot, attributes:{exclude:['createdAt','updatedAt','description']}}]
    })
    for(let i=0; i<bookings.length; i++){
        let previewImage = await Image.findOne({where:{spotId:bookings[i].spotId}})
        if (previewImage) {
            bookings[i].dataValues.Spot.dataValues.previewImage = previewImage.image
        }
    }
    return res.status(200).json({Bookings : bookings})
})

//get bookings based on spot id
router.get('/:spotId',requireAuth,async(req,res,next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
          const err = new Error("Spot couldn't be found");
          err.statusCode = 404;
          return next(err);
    }
    let bookings
    if(req.user.id === spot.ownerId){
         bookings = await Booking.findAll({
            where:{spotId: req.params.spotId},
            include:[{model:User,attributes:['id','firstName','lastName']}]
        })
        return  res.status(200).json({Bookings : bookings})
    }else{
         bookings = await Booking.findAll({
            where:{spotId: req.params.spotId},
            attributes:['spotId','startDate','endDate']
        })
        return  res.status(200).json({Bookings : bookings})
    }

})

const validateBooking = [
    check("startDate")
       .exists({ checkFalsy: true })
       .isString()
       .withMessage('Date should be string format'),
    check("startDate")
      .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
      .withMessage('Date should be in date format'),
    check("endDate")
       .exists({ checkFalsy: true })
       .isString()
       .withMessage('Date should be string format'),
    check("endDate")
      .matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
      .withMessage('Date should be in date format'),

    handleValidationErrors
]

//new create booking
router.post('/:spotId', requireAuth , validateBooking, async(req,res,next)=> {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        return next(err);
    }

    if(spot.ownerId === req.user.id){
        const err = new Error("Validation Error");
        err.errors = {date:"Owner can not book this place"}
        err.statusCode = 403;
        return next(err);
    }

    const {startDate, endDate} = req.body
    // find booking startdate is in future
    let today = new Date().toLocaleDateString('en-CA')
    if(startDate < today || endDate < today){
        const err = new Error("Validation Error");
        err.errors = {date:"Start or End date can not be in past"}
        err.statusCode = 400;
        return next(err);
    }

    //check if end date is less than start date
    if(endDate < startDate){
        const err = new Error("Validation Error");
        err.errors = {date:"End date can not be before start date"}
        err.statusCode = 400;
        return next(err);
    }

      // find if there is booking conflict
    const existingBookings = await Booking.findAll({
        where: {spotId : spot.id}
    })
    for (let i = 0; i < existingBookings.length; i++) {
        let existingBooking = existingBookings[i]
        if (((startDate < existingBooking.startDate) && (endDate < existingBooking.startDate))
            || ((startDate > existingBooking.endDate) && (endDate > existingBooking.endDate))) {
                continue
        }
        const err = new Error("Validation Error");
        err.errors = {date:"Sorry, this spot is already booked for the specified dates"}
        err.statusCode = 403
        // err.errors = {
        //     startDate: "Start date conflicts with an existing booking",
        //     endDate: "End date conflicts with an existing booking"
        // }
        return next(err)
    }

    const newdBooking = await Booking.create(
        {
            startDate,
            endDate,
            spotId:spot.id,
            userId:req.user.id,
        })
    newdBooking.dataValues.Spot = spot
    res.status(200).json(newdBooking)
})

//edit booking
router.put('/:bookingId', requireAuth , validateBooking, async(req,res,next)=> {
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking){
        const err = new Error("Server Error");
        err.errors = {date:"Booking couldn't be found"}

        err.statusCode = 404;
        return next(err);
    }

    if(booking.userId !== req.user.id){
        const err = new Error("Authentication Error");
        err.errors = {date:"Forbidden"}

        err.statusCode = 403;
        return next(err);
    }

    // can't update past bookings
    let today = new Date().toLocaleDateString('en-CA')
    let existBookEndDate = booking.endDate
    if(today > existBookEndDate) {
        const err = new Error("Validation Error");
        err.errors = {date:"Past bookings can't be modified"}
        err.statusCode = 400;
        return next(err);
    }

    // find booking startdate is in future
    const {startDate, endDate} = req.body
    if(startDate < today || endDate < today){
        const err = new Error("Validation Error");
        err.errors = {date:"Start or End date can not be in past"}
        err.statusCode = 400;
        return next(err);
    }

    //check if end date is less than start date
    if(endDate < startDate){
        const err = new Error("Validation Error");
        err.errors = {date:"End date can not be before start date"}
        err.statusCode = 400;
        return next(err);
    }

    // find if there is booking conflict
    const existingBookings = await Booking.findAll({
        where: {spotId : booking.spotId}
    })
    for (let i = 0; i < existingBookings.length; i++) {
        let existingBooking = existingBookings[i]
        if (existingBooking.id === +(req.params.bookingId)) continue
        if (((startDate < existingBooking.startDate) && (endDate < existingBooking.startDate))
            || ((startDate > existingBooking.endDate) && (endDate > existingBooking.endDate))) {
                continue
        }
        const err = new Error("Validation Error");
        err.errors = {date:"Sorry, this spot is already booked for the specified dates"}
        err.statusCode = 403
        // err.errors = {
        //     startDate: "Start date conflicts with an existing booking",
        //     endDate: "End date conflicts with an existing booking"
        // }
        return next(err)
    }

    const updatedBooking = await booking.update({startDate, endDate})
    res.status(200).json(updatedBooking)
})

//delete booking
router.delete('/:bookingId', requireAuth, async(req,res, next) =>{
    let booking = await Booking.findByPk(req.params.bookingId)
    if(!booking) {
        const err = new Error("Server Error");
        err.errors = {date:"Booking couldn't be found"}
        err.statusCode = 404;
        return next(err);

    }

    let spot = await Spot.findByPk(booking.spotId)
    if((booking.userId !== req.user.id) && (spot.ownerId !== req.user.id)) {

        const err = new Error("Authorization Error");
        err.errors = {date:"Forbidden"}
        err.statusCode = 403;
        return next(err);
    }

    let today = new Date().toLocaleDateString('en-CA');
    if(today >= booking.startDate){
        const err = new Error("Validation Error");
        err.errors = {date:"FoBookings that have been started can't be deletedbidden"}
        err.statusCode = 400;
        return next(err)

    }

    await booking.destroy()
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router
