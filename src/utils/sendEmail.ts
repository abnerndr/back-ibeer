import nodemailer from "nodemailer";
import "dotenv";

const port = process.env.EMAIL_PORT as number | undefined;

export const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
