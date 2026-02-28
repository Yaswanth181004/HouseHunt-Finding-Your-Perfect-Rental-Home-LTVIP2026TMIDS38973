const Property = require("../models/PropertySchema");

// ADD PROPERTY
exports.addProperty = async (req, res) => {
  try {
    // SAFETY CHECK FOR IMAGES
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const images = req.files.map((file) => file.filename);

    const property = new Property({
      propertyType: req.body.propertyType,
      adType: req.body.adType,
      address: req.body.address,
      ownerContact: req.body.ownerContact,

      // ✅ FIXED FIELD MAPPING
      amount: req.body.amount,               // was price ❌
      additionalInfo: req.body.additionalInfo, // was description ❌

      images,
      ownerId: req.user?.id || null           // safe fallback
    });

    await property.save();

    res.status(201).json({
      message: "Property added successfully",
      property
    });

  } catch (error) {
    console.error("Add Property Error:", error);
    res.status(500).json({ message: "Failed to add property" });
  }
};

// GET ALL PROPERTIES
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
};