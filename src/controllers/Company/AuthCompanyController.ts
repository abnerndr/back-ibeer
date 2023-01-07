import { Request, Response } from "express";
import {
  companyRespository,
  resetTokenRepository,
  walletRespository,
} from "../../repositories/companyRespository";
import { BadRequestError } from "../../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transport } from "../../utils/sendEmail";
import crypto from "crypto";

export class AuthCompanyController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const company_user = await companyRespository.findOneBy({ email });

    // if (!company_user?.stripe_customer && !company_user?.stripe_subscription) {
    if (!company_user) {
      throw new BadRequestError("E-mail ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(password, company_user.password);

    if (!verifyPass) {
      throw new BadRequestError("E-mail ou senha inválidos");
    }

    let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
    let data = {
      id: company_user.id,
    };

    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "8h" });

    const { password: _, ...userLogin } = company_user;

    const newWallet = await walletRespository.create({
      account_receipt_amount: 0,
      withdrawn_amount: 0,
      company: company_user,
    });

    console.log(newWallet);

    const wallet = await walletRespository.save(newWallet);

    console.log(wallet);

    return res.status(200).json({
      company: userLogin,
      token: token,
      wallet: wallet,
    });
    // }
  }

  async forgot(req: Request, res: Response) {
    const company = await companyRespository.findOne({
      where: { email: req.body.email },
    });

    if (!company) res.status(400).send("User doesnot exists");

    // creating a string and hashing using bcrypt
    let token = crypto.randomBytes(32).toString("hex");
    let hashToken = await bcrypt.hash(token, Number(12));

    //creating expiry after 1 hour
    let expiry = new Date(Date.now() + 1 * 3600 * 1000);

    const reset = {
      email: req.body.email,
      token,
      expiration: expiry,
      used: 1,
    };
    console.log(reset);
    const newToken = await resetTokenRepository.create({
      email: req.body.email,
      token,
      expiration: expiry,
      used: 1,
    });
    await resetTokenRepository.save(newToken);

    //updating the users table with resetToken and resetExpire

    const link = `https://localhost:3000/resetPassword/${company?.id}/${token}`;

    await transport
      .sendMail({
        to: company?.email,
        from: process.env.EMAIL_USER,
        subject: "reset password",
        text: `<a style=" background: linear-gradient(to right,#ffcb25 ,#ffbe1b);
        background-color: #ffcb25;
        color: #fff;
        font-family: Trebuchet MS;
        font-size: 18px;
        font-weight: 800;
        font-style: normal;
        text-decoration: none;
        padding: 14px 15px;
        border: 0px solid #000;
        border-radius: 10px;
        display: inline-block;" href="${link}">restar a senha</a>`,
      })
      .then((info) => console.log(info))
      .catch((error) => console.log(error));

    res.status(200).send("Link sent to email");
  }

  async reset(req: Request, res: Response) {
    const company: any = await companyRespository.findOne({
      where: { id: req.params.userId },
    });

    const resetToken: any = resetTokenRepository.findOne({
      where: { email: company?.email },
    });
    let token = req.params.token;

    const isValid = await bcrypt.compare(token, resetToken?.token);
    const expire = resetToken.expiration > Date.now();
    if (isValid && expire) {
      const password = req.body.password;
      const hashPassword = await bcrypt.hash(password, Number(12));
      const newPassword: any = await companyRespository.create({
        ...company,
        password: hashPassword,
      });
      await companyRespository.merge(company, newPassword);
      const data = await companyRespository.save(company);

      console.log(data);
      res.status(200).send("password updated successfully");
    } else res.status(400).send("Invalid link or expired");
  }
}
