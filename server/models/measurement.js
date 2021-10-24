/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Measurement = sequelize.define('Measurement', {
    moisture: DataTypes.INTEGER,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Measurement.associate = function (models) {
    // associations can be defined here
  };
  return Measurement;
};
