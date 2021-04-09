"use strict";
const { Model, UUIDV1 } = require("sequelize");
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
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        require: true,
      },
      firstName: {
        type: DataTypes.STRING,
        min: 4,
        max: 255,
        require: true,
      },
      lastName: {
        type: DataTypes.STRING,
        require: true,
        min: 4,
        max: 255,
      },
      email: {
        type: DataTypes.STRING,
        max: 255,
        require: true,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
