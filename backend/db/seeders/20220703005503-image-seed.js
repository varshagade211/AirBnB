'use strict';
const {Spot, Review, Image} = require('../models')

const imagesData = [
  {
    image:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-39283022/original/8e07d34d-eb2b-45f6-8c75-353ff6a588cb.jpeg?im_w=960',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-39283022/original/9a2dd42c-2fca-43d9-8364-6925955116cd.jpeg?im_w=720',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-39283022/original/db4f27ec-fdbf-4a4a-af6e-e6b68fd49dad.jpeg?im_w=1200',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-39283022/original/e6f73229-d89e-4c72-a676-3b7ed79a9a1e.jpeg?im_w=720',
    spotName:'Eagles Nest at Bass Lake near Yosemite',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/14e75ee2-90a7-4770-bf15-c9d6449fe481.jpg?im_w=960',
    spotName:'Villa De Lago The Lake House',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/92ad6a1f-c284-403b-ae90-cb31c39e7eda.jpg?im_w=720',
    spotName:'Villa De Lago The Lake House',
    reviewId:10
  },
  {
    image:'https://a0.muscache.com/im/pictures/ede4c991-41f9-49e4-8ecb-9befe99d8b1b.jpg?im_w=720',
    spotName:'Villa De Lago The Lake House',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/a2a1f7a2-60e3-4a43-8241-3838ee3666d3.jpg?im_w=720',
    spotName:'Peaceful Waters',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/3f628373-1263-4671-941c-6c49fb744bb0.jpg?im_w=720',
    spotName:'Peaceful Waters',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/1b817b33-068b-46d1-b6bb-62e2b4022f66.jpg?im_w=720',
    spotName:'Peaceful Waters',
    reviewId:8
  },
  {
    image:'https://a0.muscache.com/im/pictures/06b27471-7e0e-48ea-90ed-2483974df750.jpg?im_w=720',
    spotName:'Tewesi Manor',
    reviewId:7
  },
  {
    image:'https://a0.muscache.com/im/pictures/9a8b592a-30ce-4dbe-9054-6606f6dc9705.jpg?im_w=720',
    spotName:'Tewesi Manor',
    reviewId:7
  },
  {
    image:'https://a0.muscache.com/im/pictures/7fa0f41c-9a13-4956-a654-6608c63a6535.jpg?im_w=720',
    spotName:'Tewesi Manor',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/c31b1e0a-7a27-4593-bc99-112a0b9c5ab1.jpg?im_w=960',
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/98d05b4b-b2b6-4a93-9f82-4f77aa4fd550.jpg?im_w=720',
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/3a3cdf28-d278-4e2c-83e4-2847e89321fe.jpg?im_w=720',
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/7a7d4655-2acd-45d5-916b-8c3c4351b8a6.jpg?im_w=720',
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    reviewId:5
  },
  {
    image:'https://a0.muscache.com/im/pictures/miso/Hosting-568922506253611033/original/ad73f6c5-087a-4e03-bc78-58487959afc8.jpeg?im_w=720',
    spotName:'Beautiful Beachfront Lake Tahoe Home',
    reviewId:5
  },
  {
    image:'https://a0.muscache.com/im/pictures/miso/Hosting-568922506253611033/original/710e3ce7-4302-40d1-9204-770c8791e583.jpeg?im_w=960',
    spotName:'Rockhaven',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/miso/Hosting-568922506253611033/original/0c005b22-19f6-49a0-9310-9f057b05fc66.jpeg?im_w=720',
    spotName:'Rockhaven',
    reviewId:null
  },
  {
    image:'https://a0.muscache.com/im/pictures/miso/Hosting-568922506253611033/original/db192306-36ef-44f2-8c8b-0e2de04aaf8f.jpeg?im_w=720',
    spotName:'Rockhaven',
    reviewId:null
  },
]
module.exports = {
  async up (queryInterface, Sequelize) {
    for(let imageIndex = 0; imageIndex<imagesData.length; imageIndex++) {
      let imageData = imagesData[imageIndex]
      let spot = await Spot.findOne({where:{name:imageData.spotName}})
      if(spot) {
        delete imageData.spotName
        let spotId = spot.id
        await Image.create({...imageData,spotId})
      }
    }
  },

  async down (queryInterface, Sequelize) {

    for(let imageIndex = 0; imageIndex<imagesData.length; imageIndex++) {
      let imageData = imagesData[imageIndex]
      let spot = await Spot.findOne({where:{name:imageData.spotName}})
      if(spot) {
        delete imageData.spotName
        let spotId = spot.id
        await Image.destroy({where:{...imageData,spotId}})
      }
    }

  }
};
