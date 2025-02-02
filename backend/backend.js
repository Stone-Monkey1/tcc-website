const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
  origin: ["https://www.buildwithtcc.pro", "http://localhost:4200"],
  methods: ["POST", "OPTIONS"], // Include OPTIONS for preflight
};
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options("/send-email", cors(corsOptions));

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use("/send-email", limiter); // Apply to the specific route

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  const {
    firstName,
    lastName,
    zip,
    email,
    phone,
    workType,
    jobDescription,
    preferredContact,
  } = req.body;

  // Basic validation for required fields
  if (!firstName || !lastName || !zip || !workType || !preferredContact) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate preferred contact method
  if (!["email", "phone"].includes(preferredContact)) {
    return res
      .status(400)
      .json({ message: "Invalid preferred contact method" });
  }

  // Validate email and phone based on preferred contact method
  if (
    preferredContact === "email" &&
    (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
  ) {
    return res.status(400).json({ message: "Invalid or missing email" });
  }

  if (preferredContact === "phone" && (!phone || !phone.match(/^\d{10}$/))) {
    return res.status(400).json({ message: "Invalid or missing phone number" });
  }

  // Create the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: email || process.env.EMAIL_USER, // Fallback if email is not provided
    to: process.env.EMAIL_TO,
    subject: "New Estimate Request",
    text: `
          You have a new estimate request:
          Name: ${firstName} ${lastName}
          ZIP Code: ${zip}
          Preferred Contact Method: ${preferredContact}
          Email: ${email || "N/A"}
          Phone: ${phone || "N/A"}
          Work Type: ${workType}
          Job Description: ${jobDescription || "N/A"}
      `,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

// Start the server
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
