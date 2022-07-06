const express = require('express')
const router = express.Router()
const {Review,Spot,Image}= require('../../db/models')
const {  requireAuth  } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require('sequelize');


//image validation
const validateImage =[
    check("url")
       .exists({ checkFalsy: true })
       .isString()
       .withMessage("url should be in string formate"),

   handleValidationErrors

]


router.post('/spot/:spotId', requireAuth, validateImage, async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== spot.ownerId) {
        return res.status(401).json({
            "message": "Unauthorised!",
            "statusCode": 401
        })
    }

    const newImage = await Image.create({
        image: req.body.url,
        spotId: req.params.spotId,
        reviewId: null
    })

    const updatedImage = await Image.findOne({where:{id:newImage.id},attributes:['id',['image','url'],['spotId','imageableId']]})
    updatedImage.dataValues.imageableType = 'Spot'
    res.status(200).json(updatedImage)
})

router.post('/review/:reviewId', requireAuth, validateImage,  async(req,res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if(!review){
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    if (req.user.id !== review.userId) {
        return res.status(401).json({
            message: "Unauthorised!",
            statusCode: 401
        })
    }

    const countReviewImages = await Image.findAll({where:{reviewId:req.params.reviewId}})
    if(countReviewImages.length >= 10){
       return res.status(200).json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 400
        })
    }
    const newImage = await Image.create({
        image:req.body.url,
        spotId: review.spotId,
        reviewId:req.params.reviewId,
    })

    const updatedImage = await Image.findOne({where:{id:newImage.id},attributes:['id',['image','url'],['reviewId','imageableId']]})
    updatedImage.dataValues.imageableType = 'Review'
    res.status(200).json(updatedImage)
})


router.delete('/:id', requireAuth , async(req,res) => {
    const image = await Image.findByPk(req.params.id)

    if(!image){
        res.status(404).json({
            message: "Image couldn't be found",
            statusCode: 404
          })
    }
    const spot = await Spot.findByPk(image.spotId)
    const review = await Review.findByPk(image.reviewId)

    if(spot.ownerId === req.user.id || (review && (review.userId === req.user.id))) {
        await image.destroy();
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }

    return res.status(401).json({
        message: "Unauthorised!",
        statusCode: 401
    })
})
module.exports = router
