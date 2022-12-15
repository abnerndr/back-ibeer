import { Request, Response } from "express";
import { Company } from "../../entities/Company";
import { Product } from "../../entities/Product";
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
        // delete company.company_id



        let products: Product[] = [
        ]

        const product: any = {
            product_name,
            description,
            photo_url,
            categories,
            price_in_cents,
            discount_in_cents,
            company_id: 1,
            // companyCompanyId: 1,
            companyId: 1
        }

        products.push(product)

        let companie: Company = new Company()
        companie = company
        companie.products = products



        // const { ...product } = newProduct;
        // delete product.company.company_id
        // console.log(companie, 'companie')
        await productRespository.save(products)
        await companyRespository.save(companie)

        return res.json({ products: companie.products })

    }

    async index(req: Request, res: Response) {
        // const { company_id } = req.params
        // const products: any = await productRespository.findOne({ where: { id: company_id } });
        // console.log(products, 'product')
        // return res.json({ products });
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

    }

    async destroy(req: Request, res: Response) {

    }
}