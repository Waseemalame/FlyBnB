'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    listingId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    numDays: DataTypes.INTEGER,
    finalPrice: DataTypes.INTEGER,
    numGuests: DataTypes.INTEGER
  }, {});
  Reservation.associate = function(models) {
    Reservation.belongsTo(models.Listing, { foreignKey: 'listingId' })
    Reservation.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Reservation;
};
