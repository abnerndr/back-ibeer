"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const api_erros_1 = require("../../helpers/api-erros");
const companyRespository_1 = require("../../repositories/companyRespository");
const productRepository_1 = require("../../repositories/productRepository");
class ProductController {
    async create(req, res) {
        const { product_name, description, photo_url, categories, price_in_cents, discount_in_percent, ibeer_taxe_in_cents, } = req.body;
        const { company_id } = req.params;
        const company = await companyRespository_1.companyRespository.findOne({
            where: { id: company_id },
        });
        console.log("company_id", company_id);
        console.log("company", company);
        if (!company) {
            throw new api_erros_1.BadRequestError("empresa não encontrada");
        }
        delete company.password;
        const product = await productRepository_1.productRespository.create({
            product_name,
            description,
            photo_url,
            categories,
            price_in_cents,
            discount_in_percent,
            ibeer_taxe_in_cents,
            company,
        });
        if (!price_in_cents || price_in_cents < 0) {
            return res.status(404).json({
                errors: [
                    {
                        message: "Valor do produto não informado ou não é valido.",
                    },
                ],
            });
        }
        await productRepository_1.productRespository.save(product);
        return res.status(201).json(product);
    }
    async index(res) {
        const products = await productRepository_1.productRespository.find();
        return res.json({ products });
    }
    async show(req, res) {
        const { company_id } = req.params;
        if (company_id) {
            const company = await companyRespository_1.companyRespository.findOne({
                relations: {
                    products: true,
                },
                where: { id: company_id },
            });
            await (company === null || company === void 0 ? true : delete company.password);
            return res.json({ products: company.products });
        }
        return res.status(400).json({ message: "nehuma empresa encontrada" });
    }
    async update(req, res) {
        const { product_name, description, photo_url, categories, price_in_cents, discount_in_cents, } = req.body;
        const { product_id } = req.params;
        if (!product_id) {
            throw new api_erros_1.BadRequestError("id do produto não consta na base de dados");
        }
        const product = await productRepository_1.productRespository.findOne({
            where: { id: product_id },
        });
        if (!product) {
            throw new api_erros_1.BadRequestError("produto não encontrado");
        }
        const updatedProduct = await productRepository_1.productRespository.merge(product, {
            product_name,
            description,
            photo_url,
            categories,
            price_in_cents,
            discount_in_cents,
        });
        const result = await productRepository_1.productRespository.save(updatedProduct);
        return res.json({ product: result });
    }
    async destroy(req, res) {
        const { product_id } = req.params;
        if (!product_id) {
            throw new api_erros_1.BadRequestError("id do produto não consta na base de dados");
        }
        if (product_id) {
            await productRepository_1.productRespository.delete({ id: product_id });
            return res.status(201).json({ error: "produto retirado da lista" });
        }
        return res
            .status(400)
            .json({ error: "não foi possivel excluir o produto" });
    }
}
exports.ProductController = ProductController;
