const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  addProperty,
  getAllProperties
} = require("../controllers/ownerController");

// ADD PROPERTY
// router.post(
//   "/add-property",
//   upload.array("images", 5),
//   addProperty
// );
router.post(
  "/add-property",
  authMiddleware,
  upload.array("images", 5),
  addProperty
);

// GET ALL PROPERTIES (FOR RENTER)
router.get("/properties", getAllProperties);

module.exports = router;