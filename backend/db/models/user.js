'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true,
      }
    },
    firstName: {
      type: DataTypes.STRING,

    },
    lastName: {
      type: DataTypes.STRING,

    },
    linkedIn: {
      type: DataTypes.STRING
    },
    profileImg: {
      type: DataTypes.STRING,
      isUrl: true,
      defaultValue: "https://img.icons8.com/external-kiranshastry-solid-kiranshastry/40/undefined/external-user-interface-kiranshastry-solid-kiranshastry.png",
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },


  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Listing, { foreignKey: 'userId' })
    User.hasMany(models.Review, { foreignKey: 'userId' })
    User.hasMany(models.Reservation, { foreignKey: 'userId' })
  };

  User.prototype.toSafeObject = function() { // cannot be an arrow function
    const { id, username, email } = this; // User instance context
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
   };

  User.getCurrentUserById = async function (id) {
  return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, firstName, lastName, password, linkedIn, profileImg }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      firstName,
      lastName,
      linkedIn,
      profileImg,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };

  return User;
};
