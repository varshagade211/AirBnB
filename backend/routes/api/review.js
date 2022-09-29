const express = require('express')
const router = express.Router()
const {Review,Spot,Image, User}= require('../../db/models')
const {  requireAuth  } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {Op} = require('sequelize');

//get reviews of current user
router.get('/',requireAuth, async(req,res) => {
    const reviews = await Review.findAll({
        order: [
            ["id", "DESC"]
        ],
        where: { userId:req.user.id },

        include:[
            {
                model:Spot,
                attributes:{exclude:['createdAt','updatedAt','description']},
                include:[
                    {
                        model:Image,
                        attributes:['image']
                    }
                ]
            },

            {
                model:User,
                attributes:['id','firstName','lastName']
            }
        ]
    })
   return res.status(200).json({"Reviews" : reviews})
})
router.get('/user/', async(req,res,next)=>  {
    const reviews = await Review.findAll(
        {
            where:{userId:req.user.id},
            order: [
                ["id", "DESC"]
            ],
            include:[
                {
                    model:User,
                    attributes:['id','firstName','lastName']
                },
                {
                    model:Spot,
                    attributes:{exclude:['createdAt','updatedAt','description']},
                    include:[
                        {
                            model:Image,
                            attributes:['image']
                        }
                    ]
                },


            ]
        }
    )
    // if(!reviews.length){
    //     const err = new Error("Page Not Found");
    //     err.errors = {review:"Reviews couldn't be found"}
    //     err.statusCode = 404;
    //     return next(err);
    // }
   return res.status(200).json({"Reviews" : reviews})
})
//get review for spot
router.get('/:spotId', async(req,res,next)=>  {
    const reviews = await Review.findAll(
        {
            where:{spotId:req.params.spotId},
            order: [
                ["id", "DESC"]
            ],
            include:[
                {
                    model:User,
                    attributes:['id','firstName','lastName']
                },
                {
                    model:Image,
                    attributes:['image']
                }
            ]
        }
    )
    if(!reviews.length){
        const err = new Error("Spot couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
   return res.status(200).json({"Reviews" : reviews})
})

//create review validation
const validateReview = [
    check("review")
       .exists({checkFalsy:true})
       .isString()
       .withMessage("Review text is required"),
    check('review')
       .isLength({min:1, max:255})
       .withMessage('Review must be 1-255 characters'),
    // check("stars")
    //    .exists({checkFalsy:true})
    //    .isNumeric()
    //    .withMessage("Stars must be an integer from 1 to 5"),
    check("stars")
       .isInt({ min: 1, max: 5 })
       .withMessage("Stars must be an integer from 1 to 5"),

    handleValidationErrors
]
//create reveiw
router.post('/:spotId',requireAuth, validateReview, async (req,res,next)=>{
    const {review,stars} = req.body
    let spot = await Spot.findByPk(req.params.spotId)
    if(!spot){
        const err = new Error("Page Not Found");
        err.errors = {review:"Spot couldn't be found"}
        err.statusCode = 404;
        return next(err);

    }


    let newReview = await Review.create({
            review,
            stars,
            spotId:spot.id,
            userId:req.user.id
    })
    let user = await User.findByPk(req.user.id)
    newReview.dataValues.User = user
    return res.status(201).json(newReview)



})

//edit review
router.put('/:id', requireAuth, validateReview, async(req,res,next)=> {
    const foundReview = await Review.findByPk(req.params.id)
    if(!foundReview){
        const err = new Error("Review couldn't be found");
        err.statusCode = 404;
        return next(err);

    }

    const {review, stars} = req.body
    if (foundReview.userId === req.user.id) {
        const updatedReview =  await foundReview.update({review, stars})
        return res.status(200).json(updatedReview)
    } else {
        const err = new Error("Forbidden");
        err.statusCode = 403;
        return next(err);
    }
})

//Delete Review
router.delete('/:id',requireAuth, async(req,res,next)=>{
    const foundReview = await Review.findByPk(req.params.id)

    if(!foundReview){
       const err = new Error("Review couldn't be found");
        err.statusCode = 404;
        return next(err);
    }
    if (foundReview.userId === req.user.id) {
        await foundReview.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
    const err = new Error("Forbidden");
    err.statusCode = 403;
    return next(err);
})
module.exports= router
