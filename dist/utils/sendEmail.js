"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv");
const sendEmail = async (email, subject, text) => {
    const trasporter = nodemailer_1.default.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    });
    await trasporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        text: text
    });
    console.log("email send successfuly");
};
exports.sendEmail = sendEmail;
