import { Request, Response } from "express";
import { companyRespository } from "../../repositories/companyRespository";

export class WalletController {
  async show(req: Request, res: Response) {
    const { company_id } = req.params;

    const company = await companyRespository.findOne({
      where: { id: company_id },
      relations: { wallet: true },
    });

    return res.json({ wallet: company?.wallet });
  }
}
