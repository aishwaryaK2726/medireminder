const cron = require("node-cron");

const Medicine = require("./models/Medicine");
const History = require("./models/History");

console.log("Missed service started");

cron.schedule("* * * * *", async () => {
  try {
    console.log("Checking missed medicines...");

    const medicines = await Medicine.find();

    const now = new Date();
    const today = now.toLocaleDateString();

    const currentMinutes =
      now.getHours() * 60 + now.getMinutes();

    for (const med of medicines) {
      if (!med.userId) {
        console.log(
          "Skipping old medicine without userId:",
          med.medicineName
        );
        continue;
      }

      if (!med.time) {
        continue;
      }

      const [hour, minute] = med.time
        .split(":")
        .map(Number);

      const medicineMinutes = hour * 60 + minute;

      if (currentMinutes > medicineMinutes) {
        const existing = await History.findOne({
          userId: med.userId,
          medicineId: med._id,
          date: today,
        });

        if (!existing) {
          await History.create({
            userId: med.userId,
            medicineId: med._id,
            medicineName: med.medicineName,
            dosage: med.dosage,
            time: med.time,
            status: "Missed",
            date: today,
          });

          console.log(
            "Missed recorded:",
            med.medicineName
          );
        } else {
          console.log(
            "History already exists:",
            med.medicineName,
            existing.status
          );
        }
      }
    }
  } catch (error) {
    console.log("Missed service error:", error);
  }
});