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
  origin: ["https://stone-monkey1.github.io",], // GitHub Pages domain
  methods: ["POST"],
};
app.use(cors(corsOptions));

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many requests, please try again later.",
});
app.use("/send-email", limiter); // Apply to the specific route

// Endpoint to handle form submission
app.post("/send-email", async (req, res) => {
  const { firstName, lastName, zip, email, workType, jobDescription } =
    req.body;

  // Basic validation
  if (!firstName || !lastName || !zip || !email || !workType) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Create the transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Use environment variable
      pass: process.env.EMAIL_PASS, // Use environment variable
    },
  });

  // Email content
  const mailOptions = {
    from: email, // User's email
    to: process.env.EMAIL_TO, // Use environment variable
    subject: "New Estimate Request",
    text: `
    You have a new estimate request:
    Name: ${firstName} ${lastName}
    ZIP Code: ${zip}
    Email: ${email}
    Work Type: ${workType}
    Job Description: ${jobDescription}
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
const PORT = process.env.PORT || 3001; // Use the PORT variable or fallback to 3001
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
server;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
