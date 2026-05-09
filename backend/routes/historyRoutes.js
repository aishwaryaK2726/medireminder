const express = require("express");
const router = express.Router();

const History = require("../models/History");
const authMiddleware = require("../middleware/authMiddleware");

// MARK AS TAKEN
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const existingRecord = await History.findOne({
      userId: req.userId,
      medicineId: req.body.medicineId,
      date: req.body.date,
    });

    if (existingRecord) {
      existingRecord.status = "Taken";
      await existingRecord.save();

      return res.json(existingRecord);
    }

    const history = new History({
      userId: req.userId,
      medicineId: req.body.medicineId,
      medicineName: req.body.medicineName,
      dosage: req.body.dosage,
      time: req.body.time,
      status: "Taken",
      date: req.body.date,
    });

    await history.save();

    res.status(201).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER HISTORY
router.get("/", authMiddleware, async (req, res) => {
  try {
    const history = await History.find({
      userId: req.userId,
    }).sort({ _id: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;