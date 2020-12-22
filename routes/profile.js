const express = require("express");
const router = express.Router();
const {
  profile,
  fetchProfile,
  profileCreate,
  profileUpdate,
} = require("../controllers/profileController");
const upload = require("../middleware/multer");
const passport = require("passport");

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

router.get("/", profile);

router.put("/:profileId", upload.single("image"), profileUpdate);

router.post(
  "/:profileId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  profileCreate
);

module.exports = router;
