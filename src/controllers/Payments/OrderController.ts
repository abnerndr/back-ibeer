import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import { Order } from "../../entities/Order";
import { Product } from "../../entities/Product";
import { Wallet } from "../../entities/Wallet";
import { BadRequestError } from "../../helpers/api-erros";
import {
  companyRespository,
  walletRespository,
} from "../../repositories/companyRespository";
import { orderRespository } from "../../repositories/orderRepository";
import { productRespository } from "../../repositories/productRepository";

export class OrderController {
  async order(req: Request, res: Response) {
    const { product_id } = req.params;
    const { method, description } = req.body;

    const product: Product | any = await productRespository.findOne({
      where: { id: product_id },
      relations: {
        company: true,
      },
    });

    if (!product || !product_id) {
      throw new BadRequestError("produto não encontrado");
    }

    const company: Company | any = await companyRespository.findOne({
      where: { id: product.company.id },
      relations: {
        wallet: true,
      },
    });

    if (!company) {
      throw new BadRequestError("empresa não encontrada");
    }

    const wallet: Wallet | any = await walletRespository.findOne({
      where: { id: company.wallet.id },
    });

    if (!wallet) {
      throw new BadRequestError("carteira não encontrada");
    }

    const newOrder = await orderRespository.create({
      product_name: product.product_name,
      product_description: product.description,
      product_amount: product.price_in_cents,
      product_id: product.id,
      company_id: product.company.id,
      description,
      method,
      product,
    });
    console.log(wallet);

    const order = await orderRespository.save(newOrder);

    await walletRespository.merge(wallet, {
      account_receipt_amount:
        wallet?.account_receipt_amount + product.price_in_cents,
    });

    await walletRespository.save(wallet);

    if (!order) {
      throw new BadRequestError("compra não foi criada");
    }

    return res.status(201).json({ order });
  }

  async getOrders(req: Request, res: Response) {
    const { company_id } = req.params;

    const order: Order | any = await orderRespository.findOne({
      where: { company_id },
    });

    return res.json(order);
  }
}
