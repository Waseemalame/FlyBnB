'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('Users', [
    {
      email: 'demo@user.io',
      username: 'Demo-lition',
      profileImg: '',
      hashedPassword: bcrypt.hashSync('password')
    },
    {
      email: 'user1@user.io',
      username: 'FakeUser1',
      profileImg: 'https://a0.muscache.com/im/pictures/user/bbee0d2b-03be-4d66-8ced-fd65bcfcd805.jpg?aki_policy=profile_medium',
      hashedPassword: bcrypt.hashSync('password2')
    },
    {
      email: 'user2@user.io',
      username: 'FakeUser2',
      profileImg: 'https://a0.muscache.com/im/pictures/user/bbee0d2b-03be-4d66-8ced-fd65bcfcd805.jpg?aki_policy=profile_medium',
      hashedPassword: bcrypt.hashSync('password3')
    }
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});

  }
};
