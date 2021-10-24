/* eslint-disable func-names */
module.exports = (sequelize, DataTypes) => {
  const Plant = sequelize.define('Plant', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Plant.associate = function (models) {
    // associations can be defined here
  };
  return Plant;
};
