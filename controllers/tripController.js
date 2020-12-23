const { Trip } = require("../db/models");

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
    // if (req.file) {
    //   req.body.img = `http://${req.get("host")}/media/${req.file.filename}`;
    // }

    //req.body.userId this is the relation cell
    req.body.UserID = req.user.id;
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
    });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

exports.deletTrip = async (req, res, next) => {
  try {
    await req.trip.destroy();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    //   if (req.file) {
    //     req.body.img = `http://${req.get("host")}/media/${req.file.filename}`;
    //   }
    await req.trip.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
