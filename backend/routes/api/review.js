const express = require('express')
const router = express.Router()
const {Review,Spot,Image, User}= require('../../db/models')
const { setTokenCookie, requireAuth ,restoreUser } = require('../../utils/auth');


router.get('/',requireAuth, async(req,res) => {
    const reviews = await Review.findAll(
        {
            where:{userId:req.user.id},
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
        }
    )

   return res.status(200).json(reviews)

})

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
module.exports= router
