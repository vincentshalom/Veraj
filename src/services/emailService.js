import nodemailer from "nodemailer";

console.log("hello");

// Create a transporter using SMTP
export const transporter = nodemailer.createTransport({
  host: process.env.FAKE_HOST,
  port: process.env.FAKE_PORT,
  secure: false,
  auth: {
    user: process.env.FAKE_SMTP_USER,
    pass: process.env.FAKE_SMTP_PASS,
  },
});

console.log(process.env.FAKE_SMTP_PASS);

// const message = {
//   from: "sender@server.com",
//   to: "receiver@example.com",
//   subject: "Hello World",
//   text: "This is the plaintext version of the email.",
//   html: "<p>This is the <strong>HTML version</strong> of the email.</p>",
// };

const sendEmail = async function (message) {
  try {
    const info = await transporter.sendMail({
      from: '"Example Team" <team@example.com>', // sender address
      to: "alice@example.com, bob@example.com", // list of recipients
      subject: "Hello", // subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // HTML body
    });

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected:", info.rejected);
    }

    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    switch (err.code) {
      case "ECONNECTION":
      case "ETIMEDOUT":
        console.error("Network error - retry later:", err.message);
        break;
      case "EAUTH":
        console.error("Authentication failed:", err.message);
        break;
      case "EENVELOPE":
        // err.rejected is only present when every recipient was refused
        console.error("Invalid envelope:", err.message, err.rejected || []);
        break;
      default:
        console.error("Send failed:", err.message);
    }
  }
};
