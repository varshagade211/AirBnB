const express = require('express')
const router = express.Router()
const {Review,Spot,Image, User}= require('../../db/models')
const { setTokenCookie, requireAuth ,restoreUser } = require('../../utils/auth');
const {Op} = require('sequelize');

//get reviews of current user
router.get('/',requireAuth, async(req,res) => {
    const reviews = await Review.findAll({
        where: { userId:req.user.id },
        include:[
            {
                model:Spot,
                attributes:{exclude:['createdAt','updatedAt']}
            },
            {
                model:Image,
                attributes:['image']
            },
            {
                model:User
            }
        ]
    })
   return res.status(200).json(reviews)
})

//get review fo spot
router.get('/:spotId', async(req,res)=>  {
    const reviews = await Review.findAll(
        {
            where:{spotId:req.params.spotId},
            include:[{model:User},{model:Image,attributes:['image']}]
        }
    )
    if(!reviews.length){
       return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
          })
    }
   return res.status(200).json(reviews)
})

//create reveiw
router.post('/:spotId',requireAuth, async (req,res)=>{
    const {review,stars} = req.body
    let spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    let userHasReviewForSpot = await Review.findOne({
        where: {
            [Op.and]: [{spotId: spot.id}, {userId: req.user.id}]
        }
    })

    if(userHasReviewForSpot) {
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    try{
        let newReview = await Review.create({
            review,
            stars,
            spotId:spot.id,
            userId:req.user.id
        })
        return res.status(201).json(newReview)
    } catch {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                review: "Review text is required",
                stars: "Stars must be an integer from 1 to 5",
            }
        })
    }
})

//edit review
router.put('/:id', requireAuth, async(req,res)=> {
    const foundReview = await Review.findByPk(req.params.id)
    if(!foundReview){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }

    const {review, stars} = req.body
    if (foundReview.userId === req.user.id) {
        try {
            const updatedReview =  await foundReview.update({review, stars})
            return res.status(200).json(updatedReview)
        } catch {
            return res.status(400).json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                  review: "Review text is required",
                  stars: "Stars must be an integer from 1 to 5",
                }
            })
        }
    } else {
        return res.status(401).json({message:'Unauthorised!',statusCode:401})
    }
})

//Delete Review
router.delete('/:id',requireAuth, async(req,res)=>{
    const foundReview = await Review.findByPk(req.params.id)

    if(!foundReview){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (foundReview.userId === req.user.id) {
        await foundReview.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
    return res.status(401).json({
        message: "Unauthorised",
        statusCode: 401
    })
})
module.exports= router
