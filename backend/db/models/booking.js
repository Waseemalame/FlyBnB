'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    listingId:  {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    startDate:{
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    numberDays: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    finalPrice: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};
