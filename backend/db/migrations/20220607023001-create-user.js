'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING(20)
      },
      lastName: {
        type: Sequelize.STRING(20)
      },
      linkedIn: {
        type: Sequelize.STRING
      },
      profileImg: {
        type: Sequelize.STRING,
        defaultValue: "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/40/undefined/external-user-interface-kiranshastry-solid-kiranshastry.png",
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
