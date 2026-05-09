const cron = require("node-cron");
const nodemailer = require("nodemailer");

const Medicine = require("./models/Medicine");


// EMAIL TRANSPORTER

const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {

    user: "aiishwaryak27@gmail.com",

    pass: "rmquldlusobrrbil",
  },
});


// RUN EVERY MINUTE

cron.schedule("* * * * *", async () => {

  const currentTime = new Date()
    .toLocaleTimeString([], {

      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  try {

    const medicines = await Medicine.find();

    medicines.forEach(async (med) => {

      if (med.time === currentTime) {

        const mailOptions = {

          from: "appushaivas2627@gmail.com",

          to: "aiishwaryak27@gmail.com",

          subject: "💊 MediReminder Notification",

          text:
            `Time to take your medicine.\n\n` +

            `Medicine Name: ${med.medicineName}\n` +

            `Dosage: ${med.dosage}\n` +

            `Scheduled Time: ${med.time}\n` +

            `Frequency: ${med.frequency}`,
        };

        await transporter.sendMail(mailOptions);

        console.log(
          `Reminder Email Sent for ${med.medicineName}`
        );
      }
    });

  } catch (error) {

    console.log(error);
  }
});