import { Request, Response } from "express";
import { userRepository } from "../../repositories/userRepository";
import {
  companyRespository,
  resetTokenRepository,
} from "../../repositories/companyRespository";
import { BadRequestError } from "../../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { transport } from "../../utils/sendEmail";

export class AuthController {
  async login(req: Request, res: Response) {
    const repository = userRepository || companyRespository;
    const { email, password } = req.body;

    const user = await repository.findOneBy({ email });

    if (!user) {
      throw new BadRequestError("E-mail ou senha inválidos");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestError("E-mail ou senha inválidos");
    }

    let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
    let data = {
      id: user.id,
    };

    const token = jwt.sign(data, jwtSecretKey, { expiresIn: "8h" });

    const { password: _, ...userLogin } = user;

    return res.status(200).json({
      user: userLogin,
      token: token,
    });
  }

  async forgot(req: Request, res: Response) {
    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });

    if (!user) res.status(400).send("User doesnot exists");

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

    const link = `https://localhost:3000/resetPassword/${user?.id}/${token}`;

    await transport
      .sendMail({
        to: user?.email,
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
    const user: any = await userRepository.findOne({
      where: { id: req.params.userId },
    });

    const resetToken: any = resetTokenRepository.findOne({
      where: { email: user?.email },
    });
    let token = req.params.token;

    const isValid = await bcrypt.compare(token, resetToken?.token);
    const expire = resetToken.expiration > Date.now();
    if (isValid && expire) {
      const password = req.body.password;
      const hashPassword = await bcrypt.hash(password, Number(12));
      const newPassword: any = await userRepository.create({
        ...user,
        password: hashPassword,
      });
      await userRepository.merge(user, newPassword);
      const data = await userRepository.save(user);

      console.log(data);
      res.status(200).send("password updated successfully");
    } else res.status(400).send("Invalid link or expired");
  }
}
