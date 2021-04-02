'use strict';
const { SSL_OP_NO_TLSv1_2 } = require('node:constants');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Task.init({
    name:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
        len: [2, 32]
      }
    },
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    done: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }, 
    sequelize,
    modelName: 'Task',
  });
  return Task;
};