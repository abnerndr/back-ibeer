import { Request, Response } from "express";
import { userRepository } from "../../repositories/userRepository";
import { companyRespository } from "../../repositories/companyRespository";
import { BadRequestError } from "../../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    console.log("token", token);

    const { password: _, ...userLogin } = user;

    return res.status(200).json({
      user: userLogin,
      token: token,
    });
  }
}
