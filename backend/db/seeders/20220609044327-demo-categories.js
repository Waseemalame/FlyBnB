'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Categories',
    [
     {
    name: 'Desert',
    createdAt: new Date(),
    updatedAt: new Date()
    },
     {
    name: 'National Parks',
    createdAt: new Date(),
    updatedAt: new Date()
    },
     {
    name: 'Cabins',
    createdAt: new Date(),
    updatedAt: new Date()
    },
     {
    name: 'Islands',
    createdAt: new Date(),
    updatedAt: new Date()
    },
     {
    name: 'Beach',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Tiny Homes',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'OMG!',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Camping',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'A-frames',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Design',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Arctic',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Amazing pools',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Lakefront',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Surfing',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Amazing views',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Treehouses',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Tropical',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Countryside',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Caves',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Iconic cities',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Bed & Breakfasts',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Earth homes',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Farms',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Shared Homes',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Luxe',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Lake',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Historical homes',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Domes',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Golfing',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Cycladic homes',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Castles',
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
    name: 'Campers',
    createdAt: new Date(),
    updatedAt: new Date()
    },
  ], {});
  },

  down: (queryInterface, Sequelize) => {

   return queryInterface.bulkDelete('Categories', null, {});
  }
};
