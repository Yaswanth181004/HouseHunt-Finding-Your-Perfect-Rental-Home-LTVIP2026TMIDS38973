const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    propertyType: String,
    adType: String,
    address: String,
    ownerContact: String,
    amount: Number,
    additionalInfo: String,
    images: [String],
    image: {
      type: String
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);