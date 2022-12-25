import { Request, Response } from "express";
import { BadRequestError } from "../../helpers/api-erros";
import { companyRespository } from "../../repositories/companyRespository";
import { productRespository } from "../../repositories/productRepository";

export class ProductController {

    async create(req: Request, res: Response) {

        const { product_name, description, photo_url, categories, price_in_cents, discount_in_cents } = req.body
        const { company_id }: any = req.params

        const company: any = await companyRespository.findOne({ where: { id: company_id } })

        if (!company) {
            throw new BadRequestError('empresa não encontrada')
        }

        delete company.password

        const product = await productRespository.create({
            product_name,
            description,
            photo_url,
            categories,
            price_in_cents,
            discount_in_cents,
            company
        })


        if (!price_in_cents || price_in_cents < 0) {
            return res.status(404).json({
                errors: [
                    {
                        message: 'Valor do produto não informado ou não é valido.',
                    },
                ],
            })
        }


        await productRespository.save(product)
        return res.status(201).json(product)

    }

    async index(res: Response) {
        const products: any = await productRespository.find()
        return res.json({ products })
    }

    async show(req: Request, res: Response) {
        const { company_id } = req.params

        if (company_id) {
            const company: any = await companyRespository.findOne({
                relations: {
                    products: true
                },
                where: { id: company_id },
            });
            await delete company?.password
            return res.json({ products: company.products });
        }

        return res.status(400).json({ message: 'nehuma empresa encontrada' });

    }

    async update(req: Request, res: Response) {
        const { product_name, description, photo_url, categories, price_in_cents, discount_in_cents } = req.body
        const { product_id }: any = req.params


        if (!product_id) {
            throw new BadRequestError('id do produto não consta na base de dados')
        }


        const product: any = await productRespository.findOne({
            where: { id: product_id },
        });

        if (!product) {
            throw new BadRequestError('produto não encontrado')
        }

        const updatedProduct = await productRespository.merge(product, {
            product_name,
            description,
            photo_url,
            categories,
            price_in_cents,
            discount_in_cents,
        });

        const result = await productRespository.save(updatedProduct);
        return res.json({ product: result });
    }

    async destroy(req: Request, res: Response) {
        const { product_id }: any = req.params
        if (!product_id) {
            throw new BadRequestError('id do produto não consta na base de dados')
        }
        if (product_id) {
            await productRespository.delete({ id: product_id });
            return res
                .status(201)
                .json({ error: "produto retirado da lista" });
        }
        return res.status(400).json({ error: "não foi possivel excluir o produto" });
    }

}