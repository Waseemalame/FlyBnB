'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    categoryId: DataTypes.STRING,
    type: DataTypes.STRING,
    guests: DataTypes.INTEGER,
    beds: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    baths: DataTypes.INTEGER,
    amenities: DataTypes.ARRAY(DataTypes.STRING),
    price: DataTypes.NUMERIC,
    cleaningFee: DataTypes.INTEGER,
    serviceFee: DataTypes.INTEGER,
    address: DataTypes.STRING,
    lat: DataTypes.TEXT,
    lng: DataTypes.TEXT
  }, {});
  Listing.associate = function(models) {
    Listing.belongsTo(models.User, { foreignKey: 'userId' })
    Listing.belongsTo(models.Category, { foreignKey: 'categoryId' })
    Listing.hasMany(models.Image, { foreignKey: 'listingId' })
    Listing.hasMany(models.Review, { foreignKey: 'listingId' })
  };
  return Listing;
};
