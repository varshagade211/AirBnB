const express = require('express');
const router = express.Router();
const { setTokenCookie, requireAuth ,restoreUser } = require('../../utils/auth');
const {Spot,Image,User} = require('../../db/models');
const spot = require('../../db/models/spot');
const { route } = require('./user');

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

router.post('/',requireAuth, async(req,res)=>{
    const {name,address,city,state,country,lat,lng,description,price} = req.body
    let spot
    try{
        spot = await Spot.create({
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
    } catch {
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors": {
              "address": "Street address is required",
              "city": "City is required",
              "state": "State is required",
              "country": "Country is required",
              "lat": "Latitude is not valid",
              "lng": "Longitude is not valid",
              "name": "Name must be less than 50 characters",
              "description": "Description is required",
              "price": "Price per day is required"
            }
        })
    }
})

router.put('/:id',requireAuth, async(req,res)=>{
    let spot = await Spot.findByPk(req.params.id)
    if(!spot){
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    const {address,city,state,country,lat,lng,name,description,price} = req.body
    let newSpot
    if(spot.ownerId === req.user.id) {
        try {
            newSpot = await spot.update({
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
        } catch {
            return res.json({
                "message": "Validation Error",
                "statusCode": 400,
                "errors": {
                  "address": "Street address is required",
                  "city": "City is required",
                  "state": "State is required",
                  "country": "Country is required",
                  "lat": "Latitude is not valid",
                  "lng": "Longitude is not valid",
                  "name": "Name must be less than 50 characters",
                  "description": "Description is required",
                  "price": "Price per day is required"
                }
            })
        }
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
