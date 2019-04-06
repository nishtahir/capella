'use strict';
module.exports = (sequelize, DataTypes) => {
  const Measurement = sequelize.define('Measurement', {
    moisture: DataTypes.INTEGER
  }, {});
  Measurement.associate = function(models) {
    // associations can be defined here
  };
  return Measurement;
};