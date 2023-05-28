'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      course.hasOne(models.categories, { sourceKey: 'categoryId', foreignKey: 'categoryId' });
    }
  }
  course.init({
    courseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,// Automatically gets converted to SERIAL for postgres
    },
    courseName: DataTypes.STRING,
    categoryId: DataTypes.NUMBER,
    courseDescription: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'course',
    //tableName: 'courses',
  });
  return course;
};