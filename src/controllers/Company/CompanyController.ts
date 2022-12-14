import { Request, Response } from "express";
import { BadRequestError } from "../../helpers/api-erros";
import {
  companyRespository,
  walletRespository,
} from "../../repositories/companyRespository";
import bcrypt from "bcrypt";
import { Company } from "../../@types/company";
import "dotenv";

export class CompanyController {
  async store(req: Request, res: Response) {
    const {
      company_name,
      user_name,
      email,
      password,
      document,
      cellphone,
      description,
      roles,
    } = req.body;

    const userExists = await companyRespository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError("E-mail já existe");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newCompany = companyRespository.create({
      company_name,
      user_name,
      email,
      password: hashPassword,
      document,
      cellphone,
      description,
      roles,
    });

    await companyRespository.save(newCompany);

    const { password: _, ...company } = newCompany;

    return res.status(201).json({ company });
  }

  async getCompanies(req: Request, res: Response) {
    const companies: Company | any = await companyRespository.find({
      relations: {
        products: true,
        wallet: true,
      },
    });

    await companies.map((company: any) => delete company?.password);
    return res.json(companies);
  }

  async show(req: Request, res: Response) {
    if (req.params.id) {
      const company: any = await companyRespository.findOne({
        relations: {
          products: true,
          wallet: true,
        },
        where: { id: req.params.id },
      });
      await delete company?.password;
      return res.json({ company });
    }
    return res.status(400).json({ error: "lista de usuários não encontrado" });
  }

  async update(req: Request, res: Response) {
    if (req.params.id) {
      const company: any = await companyRespository.findOne({
        where: { id: req.params.id },
      });
      if (!company?.stripe_customer && !company?.stripe_subscription) {
        await companyRespository.merge(company, req.body);
        const result = await companyRespository.save(company);
        delete result.password;
        return res.json({ company: result });
      }

      return res
        .status(400)
        .json({ error: "finalize a assinatura para exibir" });
    }
    return res.status(400).json({ ßerror: "id não encontrado" });
  }

  async destroy(req: Request, res: Response) {
    if (req.params.id) {
      await companyRespository.delete({ id: req.params.id });
      return res
        .status(201)
        .json({ error: "usuario não faz mas parte no grupo" });
    }
    return res.status(400).json({ error: "erro ao tentar excluir usuário" });
  }
}
