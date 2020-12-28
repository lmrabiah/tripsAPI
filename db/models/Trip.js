module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define("Trip", {
    // username: {
    //   type: DataTypes.STRING,
    //   // allowNull: false,
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Trip;
};
