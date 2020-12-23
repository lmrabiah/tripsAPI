const express = require("express");
const router = express.Router();
const {
  profile,
  fetchProfile,

  profileUpdate,
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

router.get("/", profile);

router.put("/:profileId", upload.single("image"), profileUpdate);

module.exports = router;
