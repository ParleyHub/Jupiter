const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

('use strict');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      const hash = await hashPassword(user.password);

      user.password = hash;
    }
  });

  User.beforeBulkUpdate(async (user) => {
    if (user.attributes.password) {
      const hash = await hashPassword(user.attributes.password);

      user.attributes.password = hash;
    }
  });

  return User;
};
