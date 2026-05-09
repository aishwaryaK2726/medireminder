const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  medicineName: {
    type: String,
    required: true,
  },

  dosage: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  frequency: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Medicine", MedicineSchema);