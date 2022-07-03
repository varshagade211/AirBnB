'use strict';
const {Spot,User,Booking} = require('../models')
const bookingsData = [
  {
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    userName:'Ryan',
    startDate:'2022-08-12',
    endDate:'2022-08-13'
  },
  {
    spotName:'Villa De Lago The Lake House',
    userName:'Javier',
    startDate:'2022-09-02',
    endDate:'2022-09-05'
  },
  {
    spotName:'Peaceful Waters',
    userName:'Rakesh',
    startDate:'2022-09-02',
    endDate:'2022-09-05'
  },
  {
    spotName:'Peaceful Waters',
    userName:'Katy',
    startDate:'2022-09-12',
    endDate:'2022-09-15'
  },
  {
    spotName:'Tewesi Manor',
    userName:'Jensen',
    startDate:'2022-09-12',
    endDate:'2022-09-15'
  },
  {
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    userName:'Tom',
    startDate:'2022-10-12',
    endDate:'2022-10-15'
  },
  {
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    userName:'Javier',
    startDate:'2022-12-05',
    endDate:'2022-12-08'
  },

]
module.exports = {
  async up (queryInterface, Sequelize) {
        for(let bookingsIndex = 0; bookingsIndex< bookingsData.length; bookingsIndex++) {
            let bookingData = bookingsData[bookingsIndex]
            let name =  bookingData.spotName
            let userName = bookingData.userName
            let spot = await Spot.findOne({where:{name:name}})
            let user = await User.findOne({where:{userName:userName}})

            if(user && spot) {
              delete bookingData.userName
              delete bookingData.spotName
              let spotId = spot.id
              let userId = user.id
              await Booking.create({userId,spotId,...bookingData})
            }

        }
  },

  async down (queryInterface, Sequelize) {

    for(let bookingsIndex = 0; bookingsIndex< bookingsData.length; bookingsIndex++) {
      let bookingData = bookingsData[bookingsIndex]
      let name =  bookingData.spotName
      let userName = bookingData.userName
      let spot = await Spot.findOne({where:{name:name}})
      let user = await User.findOne({where:{userName:userName}})

      if(user && spot) {
        delete bookingData.userName
        delete bookingData.spotName
        let spotId = spot.id
        let userId = user.id
        await Booking.destroy({where:{userId,spotId,...bookingData}})
      }

  }

  }
};
