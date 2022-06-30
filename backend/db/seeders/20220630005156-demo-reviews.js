'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Reviews', [{
     listingId: 1,
     userId: 1,
     content: 'I enjoyed my stay here!',
      createdAt: new Date(),
    updatedAt: new Date()
   },{
    listingId: 2,
    userId: 1,
    content: 'I enjoyed my stay here!',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    listingId: 3,
    userId: 2,
    content: 'I enjoyed my stay here!',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    listingId: 1,
    userId: 1,
    content: 'I enjoyed my stay here!',
    createdAt: new Date(),
    updatedAt: new Date()
  },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Reviews', null, {});
  }
};
