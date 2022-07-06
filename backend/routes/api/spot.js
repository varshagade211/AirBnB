const express = require('express');
const router = express.Router();
const {  requireAuth  } = require('../../utils/auth');
const {Spot,Image,User} = require('../../db/models');
const spot = require('../../db/models/spot');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { route } = require('./user');

router.get('/', async(req,res,next) => {
    let spots = await Spot.findAll({
        include:[{
            model: Image,
            attributes:['image'],
        }]}
    )

    if(!spots) {
        const error = new Error('No spots available')
        next(error)
        return
    }

    for(let i=0; i<spots.length; i++){
        if(spots[i].Images){
            let previewImg = spots[i].Images[0].image
            delete spots[i].dataValues.Images
            spots[i].dataValues["previewImage"] = previewImg
        }
    }
    res.json({spots})
})

router.get('/:id', async(req,res,next) => {
    let spot = await Spot.findByPk(req.params.id,
        {include:[{model:Image},{model:User , as: 'Owner'}]})

    if(!spot){
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
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
    return res.status(201).json(spot)
})

router.put('/:id', requireAuth, validateSpot, async(req,res)=>{
    let spot = await Spot.findByPk(req.params.id)
    if(!spot){
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
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
        return res.status(201).json(newSpot)
    } else {
        return res.status(401).json({message:'Unauthorised!',status:401})
    }
})


router.delete('/:id', requireAuth, async(req,res,next)=> {
    const spot = await Spot.findOne({where:{ownerId:req.params.id}})
    if(!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if(spot.ownerId === req.user.id) {
        try {
            spot.destroy()
            return res.status(200).json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } catch {
            return res.status(500).json({"message": "Failed to remove spot"})
        }
    } else {
        return res.status(401).json({
            "message": "Unauthorised!",
            "statusCode": 401
        })
    }
})

module.exports = router
