const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("./reminderService");
const medicineRoutes = require("./routes/medicineRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);


// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/medireminder")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// Routes
app.use("/medicines", medicineRoutes);


app.get("/", (req, res) => {
  res.send("MediReminder Backend Running");
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
});