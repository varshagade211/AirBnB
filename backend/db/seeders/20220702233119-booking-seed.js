'use strict';
const {Spot,User,Booking} = require('../models')
const bookingsData = [
  {
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    email:'ryan@user.io',
    startDate:'2022-08-12',
    endDate:'2022-08-13'
  },
  {
    spotName:'Villa De Lago The Lake House',
    email:'javier@user.io',
    startDate:'2022-09-02',
    endDate:'2022-09-05'
  },
  {
    spotName:'Peaceful Waters',
    email:'rakesh@user.io',
    startDate:'2022-09-02',
    endDate:'2022-09-05'
  },
  {
    spotName:'Peaceful Waters',
    email:'katy@user.io',
    startDate:'2022-09-12',
    endDate:'2022-09-15'
  },
  {
    spotName:'Tewesi Manor',
    email:'jensen@user.io',
    startDate:'2022-09-12',
    endDate:'2022-09-15'
  },
  {
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    email:'tom@user.io',
    startDate:'2022-10-12',
    endDate:'2022-10-15'
  },
  {
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    email:'javier@user.io',
    startDate:'2022-12-05',
    endDate:'2022-12-08'
  },

]
module.exports = {
  async up (queryInterface, Sequelize) {
        for(let bookingsIndex = 0; bookingsIndex< bookingsData.length; bookingsIndex++) {
            let bookingData = bookingsData[bookingsIndex]
            let name =  bookingData.spotName
            let userEmail = bookingData.email
            let spot = await Spot.findOne({where:{name:name}})
            let user = await User.findOne({where:{email:userEmail}})

            if(user && spot) {
              delete bookingData.userEmail
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
      let userEmail = bookingData.email
      let spot = await Spot.findOne({where:{name:name}})
      let user = await User.findOne({where:{email:userEmail}})

      if(user && spot) {
        delete bookingData.email
        delete bookingData.spotName
        let spotId = spot.id
        let userId = user.id
        await Booking.destroy({where:{userId,spotId,...bookingData}})
      }

  }

  }
};
