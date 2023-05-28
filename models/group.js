'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class group extends Model {
   
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      group.hasOne(models.categories, { sourceKey: 'categoryId', foreignKey: 'categoryId' });
    }
  }
  group.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'group',
  });
  return group;
};