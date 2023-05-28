'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      categories.hasMany(models.course, { sourceKey: 'categoryId', foreignKey: 'categoryId' });
    }
  }
  categories.init({
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    parentCategoryId: DataTypes.NUMBER,
    name: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'categories',
  });
  return categories;
};