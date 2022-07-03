'use strict';
const{Review, User , Spot} = require('../models')
const reviewsData = [
  {
    userName:'Javier',
    spotName:'Villa De Lago The Lake House',
    review:'Nice place to visit',
    stars:5
  },
  {
    userName:'Ryan',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    review:"This is gorgeous home lakefront with beautiful views. The house is from 1938, and it's a beautiful, authentic Lake Tahoe experience",
    stars:5
  },
  {
    userName:'Jensen',
    spotName:'Peaceful Waters',
    review:'This home is in a great location. Only a couple miles from the casinos and restaurants. The neighborhood is quiet and you can’t get a better view of the lake.',
    stars:4
  },
  {
    userName:'Bill',
    spotName:'Peaceful Waters',
    review:'Clean and Beautiful cabin with stunning lake view! Great location !! It’s a quiet community and mins away from grocery. We hope to visit again soon :))',
    stars:4
  },
  {
    userName:'Katy',
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    review:'The house has a very beautiful view. We all had a good stay over there.',
    stars:5
  },
  {
    userName:'Rakesh',
    spotName:'Tewesi Manor',
    review:'Charming home with an incredible view - we had a wonderful time :)',
    stars:5
  },
  {
    userName:'Katy',
    spotName:'Tewesi Manor',
    review:'Plenty of space for all. 6 beds plus a couch pullout bed. Great location great with amazing views.',
    stars:4
  },
  {
    userName:'Tom',
    spotName:'Peaceful Waters',
    review:'We enjoyed our stay and the amazing waterfront views of the lake and the mountains. The location was central to downtown and local attractions.',
    stars:4
  },
  {
    userName:'Ryan',
    spotName:'Villa De Lago The Lake House',
    review:'The views and hospitality was amazing! Thank you!',
    stars:5
  },
  {
    userName:'Rakesh',
    spotName:'Villa De Lago The Lake House',
    review:'Great location, right on the waterfront, for our family to stay together. It was comfortable and cozy!',
    stars:4
  },
  {
    userName:'Jensen',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    review:"Brandon was a super awesome host. The house is beautiful and the views are amazing. We were super excited at the amenities such as the kayaks and paddle board. My family and I had a great time!",
    stars:4
  },
  {
    userName:'Tom',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    review:null,
    stars:3
  },
]

module.exports = {
  async up (queryInterface, Sequelize) {

    for(let reviewIndex=0; reviewIndex<reviewsData.length; reviewIndex++) {
       let reviewData = reviewsData[reviewIndex]
       let userName = reviewData.userName
       let spotName = reviewData.spotName

       let user = await User.findOne({where:{userName:userName}})
       let spot = await Spot.findOne({where:{name:spotName}})
       if(user && spot) {
        delete reviewData.userName
        delete reviewData.spotName
        let userId = user.id
        let spotId = spot.id
        await Review.create({userId,spotId,...reviewData})
       }
    }

  },

  async down (queryInterface, Sequelize) {
    for(let reviewIndex=0; reviewIndex<reviewsData.length; reviewIndex++) {
      let reviewData = reviewsData[reviewIndex]
      let userName = reviewData.userName
      let spotName = reviewData.spotName
      let user = await User.findOne({where:{userName:userName}})
      let spot = await Spot.findOne({where:{name:spotName}})
      if(user && spot) {
       delete reviewData.userName
       delete reviewData.spotName
       let userId = user.id
       let spotId = spot.id
       await Review.destroy({where :{userId,spotId,...reviewData}})
      }
   }

  }
};
