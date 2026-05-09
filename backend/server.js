const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const medicineRoutes = require("./routes/medicineRoutes");
const authRoutes = require("./routes/authRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/medicines", medicineRoutes);
app.use("/history", historyRoutes);

app.get("/", (req, res) => {
  res.send("MediReminder Backend Running");
});

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/medireminder")
  .then(() => {
    console.log("MongoDB Connected");

    // Start background services only after DB connects
    require("./missedService");
    require("./reminderService");
  })
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});