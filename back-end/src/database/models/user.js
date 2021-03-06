'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'users',
    });

  User.associate = (models) => {
    User.hasOne(models.sale,
      { foreignKey: 'userId', as: 'cart' });
  };

  return User;
};
