const express = require("express");
const {
  creatTrip,
  tripsList,
  deletTrip,
  fetchTrip,
  updateTrip,
} = require("../controllers/tripController");
const passport = require("passport");
const upload = require("../middleware/multer");
const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = {
      status: 404,
      message: "trip not found",
    };
    next(err);
  }
});
router.get("/", tripsList);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  creatTrip
);

router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  deletTrip
);

router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateTrip
);

module.exports = router;
