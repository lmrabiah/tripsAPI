module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    image: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
  });
  return Profile;
};
