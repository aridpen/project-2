'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cocktail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //one cocktail can have many comments
      models.cocktail.hasMany(models.comment)
      
      //one cocktail can belong to many users
      models.cocktail.belongsToMany(models.user, {
        through: 'users_cocktails'
      })
    }
  }
  cocktail.init({
    name: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructions: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'cocktail',
  });
  return cocktail;
};