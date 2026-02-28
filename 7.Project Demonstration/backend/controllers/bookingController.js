const Booking = require('../models/BookingSchema');
const Property = require('../models/PropertySchema');

exports.createBooking = async (req, res) => {
  try {
    const property = await Property.findById(req.body.propertyId);

    const booking = await Booking.create({
      propertyId: property._id,
      renterId: req.user.id,
      ownerId: property.ownerId
    });

    res.status(201).json(booking);
  } catch {
    res.status(500).json({ message: 'Booking failed' });
  }
};

exports.getOwnerBookings = async (req, res) => {
  const bookings = await Booking.find({ ownerId: req.user.id })
    .populate('propertyId')
    .populate('renterId', 'name');
  res.json(bookings);
};

exports.updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(booking);
};

exports.getRenterBookings = async (req, res) => {
  const bookings = await Booking.find({ renterId: req.user.id })
    .populate('propertyId');
  res.json(bookings);
};