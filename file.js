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