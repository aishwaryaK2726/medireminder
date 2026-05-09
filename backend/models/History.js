const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  medicineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
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

  status: {
    type: String,
    enum: ["Taken", "Missed"],
    required: true,
  },

  date: {
    type: String,
    required: true,
  },
});

const History = mongoose.model("History", HistorySchema);

module.exports = History;