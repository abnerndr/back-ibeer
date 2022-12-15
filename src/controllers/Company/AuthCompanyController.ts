import { Request, Response } from "express";
import { companyRespository } from "../../repositories/companyRespository";
import { BadRequestError } from "../../helpers/api-erros";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthCompanyController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const company_user = await companyRespository.findOneBy({ email });

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

    return res.status(200).json({
      company: userLogin,
      token: token,
    });
  }
}
