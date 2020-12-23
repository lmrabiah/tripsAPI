module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    profileImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Profile;
};
