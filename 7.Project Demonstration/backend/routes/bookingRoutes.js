const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createBooking,
  getOwnerBookings,
  getRenterBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

// CREATE BOOKING (RENTER)
router.post("/create", authMiddleware, createBooking);

// GET BOOKINGS FOR OWNER
router.get("/owner", authMiddleware, getOwnerBookings);

// GET BOOKINGS FOR RENTER
router.get("/renter", authMiddleware, getRenterBookings);

// ✅ UPDATE BOOKING STATUS (APPROVE / REJECT)
router.put("/:id", authMiddleware, updateBookingStatus);

module.exports = router;