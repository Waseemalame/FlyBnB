'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: DataTypes.INTEGER,
    listingId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Listing, { foreignKey: 'listingId'})
    Review.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Review;
};
