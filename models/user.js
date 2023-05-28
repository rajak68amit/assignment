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
      // user.hasOne(models.address, { sourceKey: 'id', foreignKey: 'userid' });
      // user.hasOne(models.roles, { sourceKey: 'roleid', foreignKey: 'id' });
      // //user.hasOne(models., { sourceKey: 'id', foreignKey: 'serviceengid' }); // find user block id 
      // user.hasOne(models.tickets, { sourceKey: 'id', foreignKey: 'serviceengid' }); // find user block id 
    }
  }

  user.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    usertype: DataTypes.NUMBER,
    name: DataTypes.STRING,
    courseId: DataTypes.NUMBER,
    email: DataTypes.STRING,
    phone: DataTypes.NUMBER,
    password: DataTypes.STRING,
    isActive: DataTypes.NUMBER,
    isDelete: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user'
  });
  return user;
};

