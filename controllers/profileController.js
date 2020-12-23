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

exports.profileCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    req.body.userId = req.user.id;
    const newProfile = await Profile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    next(error);
  }
};

exports.profileUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    await req.profile.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(error);
  }
};
