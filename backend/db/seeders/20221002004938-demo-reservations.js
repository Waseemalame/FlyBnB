'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Reservations', [
    {
     userId: 2,
     listingId: 1,
     startDate: '2022-10-20',
     endDate: '2022-10-23',
     numDays: 3,
     finalPrice: 3331,
     numGuests: 7,
     createdAt: new Date(),
     updatedAt: new Date()
   },
   {
    userId: 1,
    listingId: 3,
    startDate: '2022-11-11',
    endDate: '2022-11-14',
    finalPrice: 775,
    numDays: 3,
    numGuests: 3,
   }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Reservations', null, {});
  }
};
