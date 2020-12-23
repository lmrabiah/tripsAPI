module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Trip;
};
