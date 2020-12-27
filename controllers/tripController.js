const { Trip, User } = require("../db/models");

exports.fetchTrip = async (tripId, next) => {
  try {
    const foundTrip = await Trip.findByPk(tripId);
    return foundTrip;
  } catch (error) {
    next(error);
  }
};

exports.creatTrip = async (req, res, next) => {
  console.log(req.user);
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    //req.body.userId this is the relation cell
    req.body.userId = req.user.id;
    const newTrip = await Trip.create(req.body);
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.tripsList = async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id"],
        },
      ],
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.deletTrip = async (req, res, next) => {
  if (req.user.id === req.trip.userId) {
    await req.trip.destroy();
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  if (req.user.id === req.trip.userId) {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }

    await req.trip.update(req.body);
    res.status(204).end();
  } else {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};
