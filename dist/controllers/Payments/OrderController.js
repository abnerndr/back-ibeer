"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const api_erros_1 = require("../../helpers/api-erros");
const companyRespository_1 = require("../../repositories/companyRespository");
const orderRepository_1 = require("../../repositories/orderRepository");
const productRepository_1 = require("../../repositories/productRepository");
class OrderController {
    async order(req, res) {
        const { product_id } = req.params;
        const { method, description } = req.body;
        const product = await productRepository_1.productRespository.findOne({
            where: { id: product_id },
            relations: {
                company: true,
            },
        });
        if (!product || !product_id) {
            throw new api_erros_1.BadRequestError("produto não encontrado");
        }
        const company = await companyRespository_1.companyRespository.findOne({
            where: { id: product.company.id },
            relations: {
                wallet: true,
            },
        });
        if (!company) {
            throw new api_erros_1.BadRequestError("empresa não encontrada");
        }
        const wallet = await companyRespository_1.walletRespository.findOne({
            where: { id: company.wallet.id },
        });
        if (!wallet) {
            throw new api_erros_1.BadRequestError("carteira não encontrada");
        }
        const newOrder = await orderRepository_1.orderRespository.create({
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
        const order = await orderRepository_1.orderRespository.save(newOrder);
        await companyRespository_1.walletRespository.merge(wallet, {
            account_receipt_amount: (wallet === null || wallet === void 0 ? void 0 : wallet.account_receipt_amount) + product.price_in_cents,
        });
        await companyRespository_1.walletRespository.save(wallet);
        if (!order) {
            throw new api_erros_1.BadRequestError("compra não foi criada");
        }
        return res.status(201).json({ order });
    }
    async getOrders(req, res) {
        const { company_id } = req.params;
        const order = await orderRepository_1.orderRespository.findOne({
            where: { company_id },
        });
        return res.json(order);
    }
}
exports.OrderController = OrderController;
