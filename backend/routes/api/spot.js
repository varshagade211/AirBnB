const express = require('express');
const router = express.Router();
const {  requireAuth  } = require('../../utils/auth');
const {Spot,Image,User,Review,sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { query } = require('express-validator/check');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require("sequelize")

const queryValidator = [
    query('page')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("Page must be greater than or equal to 0"),
    query('page')
      .optional()
      .isInt({ min: 0})
      .withMessage("Page must be greater than or equal to 0"),
    query('size')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("Page must be greater than or equal to 0"),
    query('size')
      .optional()
      .isInt({ min: 0})
      .withMessage("Size must be greater than or equal to 0"),
    query('maxLat')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("Maximum latitude is invalid"),
    query('maxLat')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    query('minLat')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("Maximum latitude is invalid"),
    query('minLat')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
      query('minLng')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("Maximum latitude is invalid"),
    query('minLng')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    query('maxLng')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("Maximum latitude is invalid"),
    query('maxLng')
      .optional()
      .isDecimal()
      .withMessage("Maximum latitude is invalid"),
    query('minPrice')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("MinPrice must be greater than or equal to 0"),
    query('minPrice')
      .optional()
      .isInt({ min: 0})
      .withMessage("MinPrice must be greater than or equal to 0"),
    query('maxPrice')
      .optional()
      .exists({ checkFalsy: true })
      .withMessage("MaxPrice must be greater than or equal to 0"),
    query('maxPrice')
      .optional()
      .isInt({ min: 0})
      .withMessage("MaxPrice must be greater than or equal to 0"),

   handleValidationErrors
]

router.get('/', queryValidator, async(req,res,next) => {
    let {page,size,minLat,maxLat,minLng,maxLng,minPrice,maxPrice}=req.query

    page = parseInt(page)
    size = parseInt(size)

    if(isNaN(page) || page < 0) {
        page = 0
    }
    if(page > 10) {
        page = 10
    }
    if(isNaN(size) || size < 0 ) {
        size = 20
    }
    if(size > 20) {
        size = 20
    }

    const where = {}
    if(minLat || maxLat ) {
        if (minLat) {
            minLat = parseFloat(minLat)
            if(isNaN(minLat)) {
                minLat = -90
            }
        } else {
            minLat = -90
        }
        if (maxLat) {
            maxLat = parseFloat(maxLat)
            if(isNaN(maxLat)) {
                maxLat = 90
            }
        } else {
            maxLat = 90
        }
        where.lat = {[Op.between] : [minLat, maxLat]}
    }
    if(minLng || maxLng ) {
        if (minLng) {
            minLng = parseFloat(minLng)
            if(isNaN(minLng)) {
                minLng = -180
            }
        } else {
            minLng = -180
        }
        if (maxLng) {
            maxLng = parseFloat(maxLng)
            if(isNaN(maxLng)) {
                maxLng = 180
            }
        } else {
            maxLng = 180
        }
        where.lng = {[Op.between] : [minLng, maxLng]}
    }

    if(minPrice || maxPrice){
        if(minPrice) {
            minPrice = parseInt(minPrice)
            if(isNaN(minPrice) || minPrice < 0){
                minPrice = 0
            }
        }else{
            minPrice = 0
        }
        if(maxPrice) {
            maxPrice = parseInt(maxPrice)
            if(isNaN(maxPrice) || maxPrice < 0){
                maxPrice = 0
            }
        }else{
            maxPrice = 0
        }
        where.price = {[Op.between]:[minPrice,maxPrice]}
    }
    let spots = await Spot.findAll({
        where,
        include:[{
            model: Image,
            attributes:['image']

        }],
        limit:size,
        offset:size*(page-1)
    })

    for(let i=0; i<spots.length; i++) {
        spots[i].dataValues["previewImage"] = ""
        if(spots[i].Images.length) {
            let previewImg = spots[i].Images[0].image
            spots[i].dataValues["previewImage"] = previewImg
        }
        if (spots[i].Images) {
            delete spots[i].dataValues.Images
        }
    }
    res.json({Spots: spots,page,size})
})

router.get('/user/spots',requireAuth, async(req,res,next)=> {
    const {user} = req
    const spots = await Spot.findAll({where:{ownerId:user.id}})
    res.status(200).json({Spots : spots})
})

router.get('/:id', async(req,res,next) => {
    let spot = await Spot.findByPk(req.params.id,
        {
            include:[
                {model:Image, attributes:['image']},
                {model:User , as: 'Owner', attributes:['id','firstName','lastName']},

            ]
        })

    if(!spot){
       const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    let spotReviews = await Review.findAll({
        where: {spotId:spot.id},
        //attributes: {include: [[sequelize.fn('COUNT', sequelize.col('*')), 'numReviews']]}
    })
    spot.dataValues.numReviews = spotReviews.length
    let total = 0
    spotReviews.forEach((ele)=>{
        total += ele.stars
    })
    spot.dataValues.avgStarRating = (total / spotReviews.length)

    return res.status(200).json(spot)
})

//create spot validation
const validateSpot = [
    check('name')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Name must be less than 50 characters'),
    check('name')
      .notEmpty()
      .withMessage('Name must be less than 50 characters'),
    check('name')
      .isLength({max:49})
      .withMessage('Name must be less than 50 characters'),
    check('address')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Street address is required'),
    check('address')
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('City is required'),
    check('city')
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('State is required'),
    check('state')
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Country is required'),
    check('country')
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .isDecimal()
      .withMessage('Longitude is not valid'),
    check('description')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Description is required'),
    check('description')
      .notEmpty()
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .isNumeric()
      .withMessage('Price per day is required'),

    handleValidationErrors
  ];

router.post('/', requireAuth, validateSpot, async(req,res)=>{
    const {name,address,city,state,country,lat,lng,description,price} = req.body
    let spot = await Spot.create({
        name,
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        price,
        ownerId:req.user.id
    })
    return res.status(200).json(spot)
})

router.put('/:id', requireAuth, validateSpot, async(req,res,next)=>{
    let spot = await Spot.findByPk(req.params.id)
    if(!spot){
        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    const {address,city,state,country,lat,lng,name,description,price} = req.body

    if(spot.ownerId === req.user.id) {
        let newSpot = await spot.update({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
        return res.status(200).json(newSpot)
    } else {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
    }
})


router.delete('/:id', requireAuth, async(req,res,next)=> {
    const spot = await Spot.findOne({where:{id:req.params.id}})
    if(!spot) {
        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    if(spot.ownerId === req.user.id) {
        try {
            spot.destroy()
            return res.status(200).json({
                message: "Successfully deleted",
                statusCode: 200
            })
        } catch {
            const err = new Error("Failed to remove spot");
            err.statusCode = 500;
            return next(err);
        }
    } else {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
    }
})

module.exports = router
