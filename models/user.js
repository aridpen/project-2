'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one user can have many cocktails 1:M
      models.user.hasMany(models.comment)
      models.user.belongsToMany(models.cocktail, {
        through: 'users_cocktails'
      })
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};