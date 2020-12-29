const { Profile } = require("../db/models");

exports.profile = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    const foundProfile = await Profile.findByPk(req.user.id);
    // If profile exists
    if (foundProfile) {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      }
      await foundProfile.update(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    next(error);
  }
};

exports.fetchProfileGuest = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    // next(error);
  }
};

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};
