const express = require("express");
const router = express.Router();

const Medicine = require("../models/Medicine");
const authMiddleware = require("../middleware/authMiddleware");

// ADD MEDICINE
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const medicine = new Medicine({
      userId: req.userId,
      medicineName: req.body.medicineName,
      dosage: req.body.dosage,
      time: req.body.time,
      frequency: req.body.frequency,
    });

    await medicine.save();

    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER MEDICINES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const medicines = await Medicine.find({
      userId: req.userId,
    });

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE MEDICINE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Medicine.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({ message: "Medicine deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE MEDICINE
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedMedicine = await Medicine.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      req.body,
      { new: true }
    );

    res.json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;