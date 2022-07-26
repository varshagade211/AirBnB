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
router.get('/', async(req,res,next) => {
    const images = await Image.findAll({
        attributes:['id',['image','url'],['spotId','imageableId']]
    })
    if(!images) {
        const err = new Error("Image couldn't be found");
        err.statusCode = 404;
        return next(err)
    }

    res.status(200).json(images)
})
router.post('/spot/:spotId', requireAuth, validateImage, async(req,res,next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if(!spot){

        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        return next(err)
    }
    if (req.user.id !== spot.ownerId) {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
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

router.post('/review/:reviewId', requireAuth, validateImage,  async(req,res, next) => {
    const review = await Review.findByPk(req.params.reviewId)
    if(!review){
        const err = new Error("Review couldn't be found");
        err.statusCode = 404;
        return next(err)
    }
    if (req.user.id !== review.userId) {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
    }

    const countReviewImages = await Image.findAll({where:{reviewId:req.params.reviewId}})
    if(countReviewImages.length >= 10){
        const err = new Error("Maximum number of images for this resource was reached");
        err.statusCode = 400;
        return next(err)
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

router.delete('/:id', requireAuth , async(req,res, next) => {
    const image = await Image.findByPk(req.params.id)

    if(!image){
        const err = new Error("Image couldn't be found");
        err.statusCode = 404;
        return next(err)
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

    const err = new Error("Forbidden");
    err.statusCode = 403;
    return next(err);
})
module.exports = router
