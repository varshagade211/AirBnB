const express = require('express')
const router = express.Router()
const {Review,Spot,Image}= require('../../db/models')
const { setTokenCookie, requireAuth ,restoreUser } = require('../../utils/auth');


router.get('/',requireAuth, async(req,res) => {
    const reviews = await Review.findAll(
        {
            where:{userId:req.user.id},
            include:[
                {
                    model:Spot,
                    attributes:{exclude:['createdAt','updatedAt']}},
                {
                    model:Image,
                    attributes:['image']

                }]
        }
    )

   return res.status(200).json(reviews)

})
module.exports= router
