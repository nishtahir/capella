'use strict';
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define('Plant', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Plant.associate = function (models) {
    // associations can be defined here
  };
  return Plant;
};