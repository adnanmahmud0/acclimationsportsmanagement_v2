import nodemailer from "nodemailer";

export interface ISendEmail {
  to: string;
  subject: string;
  html: string;
}

const createTransporter = async () => {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = Number(process.env.EMAIL_PORT || 587);

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // Fallback for development (Ethereal)
  if (process.env.NODE_ENV !== "production") {
    try {
      const testAccount = await nodemailer.createTestAccount();
      return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (error) {
      console.error("Failed to create Ethereal test account:", error);
    }
  }

  return null;
};

export const sendEmail = async (values: ISendEmail) => {
  try {
    const transporter = await createTransporter();
    if (!transporter) {
      console.warn("Email transporter not configured. Email not sent.");
      return;
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@acclimation.com",
      to: values.to,
      subject: values.subject,
      html: values.html,
    });

    if (process.env.NODE_ENV !== "production") {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log("Email Preview URL:", previewUrl);
      }
    }
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

export const emailHelper = { sendEmail };
