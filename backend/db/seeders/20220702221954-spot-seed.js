'use strict';
const {Spot,User} = require('../models')
const spotsData = [
  {
  name:'Eagles Nest at Bass Lake near Yosemite',
  address:'Bass Lake',
  city:'Yosemite',
  state:'California',
  country:'United States',
  lat:37.3366,
  lng:119.5794,
  description:"Welcome to Eagle's Nest, one of the most ideally located Lakefront homes on Bass Lake! Opportunities to see bald eagles and catch fish right from your own boat dock!",
  price:1408,
  ownerEmail:'tom@user.io'
},
{
  name:'Villa De Lago The Lake House',
  address:'Glenbrook',
  city:'Glenbrook',
  state:'Nevada',
  country:'United States',
  lat:39.0900,
  lng:119.9378,
  description:"A private street on the shoreline of Lake Tahoe below historic Cave Rock. A retreat into nature with the accessibility to Cave Rock boat launch nearby at Cave Rock State Park.",
  price:950,
  ownerEmail:'ryan@user.io'
},
{
  name:'Peaceful Waters',
  address:'Tahoma',
  city:'Tahoma',
  state:'California',
  country:'United States',
  lat:39.0674,
  lng:120.1282,
  description:"Bear sightings are known to occur in the area. Doors should be locked at all times to avoid bears from entering the home",
  price:3000,
  ownerEmail:'javier@user.io'
},
{
  name:'Tewesi Manor',
  address:'Carnelian Bay',
  city:'Carnelian Bay',
  state:'California',
  country:'United States',
  lat:39.2269,
  lng:120.0819,
  description:"A private pier, swim platform, and fire pit fill 200 feet of lake frontage at this secluded villa built in the mold of a classic Old Tahoe manor.",
  price:8700,
  ownerEmail:'jensen@user.io'
},
{
  name:'Beautiful Beachfront Lake Tahoe Home',
  address:'Zephyr Cove-Round Hill Village',
  city:'Tahoe',
  state:'Nevada',
  country:'United States',
  lat:39.006821,
  lng:-119.948364,
  description:"Welcome to a wonderful beachfront home with breathtaking views and direct access to the shores of Lake Tahoe, located in the private neighborhood of Marla Bay in Zephyr Cove, Nevada.",
  price:712,
  ownerEmail:'rakesh@user.io'
},
{
  name:'Rockhaven',
  address:'Meeks Bay',
  city:'Meeks Bay',
  state:'California',
  country:'United States',
  lat:39.0344,
  lng:120.1241,
  description:"Not 1 but 4 hot tubs peer over Lake Tahoe at this massive retreat with 300 feet of shore on Meeks Bay.",
  price:14000,
  ownerEmail:'varsha@user.io'
},
]

module.exports = {
  async up (queryInterface, Sequelize) {
    for(let spotIndex = 0; spotIndex < spotsData.length; spotIndex++) {
      let spotData = spotsData[spotIndex]
      let userEmail = spotData.ownerEmail
      const owner = await User.findOne({where:{email:userEmail}})
      if (owner) {
        const ownerId = owner.id
        delete spotData.ownerEmail
        await Spot.create({...spotData, ownerId})
      }
    }
  },

  async down (queryInterface, Sequelize) {
    for(let spotIndex = 0; spotIndex < spotsData.length; spotIndex++) {
      let spotData = spotsData[spotIndex]
      let userEmail = spotData.ownerEmail
      const owner = await User.findOne({where:{email:userEmail}})
      if (owner) {
        const ownerId = owner.id
        delete spotData.ownerEmail
        await Spot.destroy({where : {...spotData, ownerId}})
      }
    }
  },
};
