const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  profile,
  fetchProfile,
  profileUpdate,
  fetchProfileGuest,
} = require("../controllers/profileController");
const upload = require("../middleware/multer");

// Routes

router.param("profileId", async (req, res, next, profileId) => {
  const profile = await fetchProfile(profileId, next);
  if (profile) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

router.param("profileId", async (req, res, next, profileId) => {
  const profileGuest = await fetchProfileGuest(profileId, next);
  if (profileGuest) {
    req.profile = profile;
    next();
  } else {
    const err = new Error("Profile Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", fetchProfileGuest);

router.get("/", profile);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileUpdate
);

module.exports = router;
