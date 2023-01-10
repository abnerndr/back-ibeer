"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const api_erros_1 = require("../../helpers/api-erros");
const companyRespository_1 = require("../../repositories/companyRespository");
const bcrypt_1 = __importDefault(require("bcrypt"));
require("dotenv");
class CompanyController {
    async store(req, res) {
        const { company_name, user_name, email, password, document, cellphone, description, roles, } = req.body;
        const userExists = await companyRespository_1.companyRespository.findOneBy({ email });
        if (userExists) {
            throw new api_erros_1.BadRequestError("E-mail já existe");
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newCompany = companyRespository_1.companyRespository.create({
            company_name,
            user_name,
            email,
            password: hashPassword,
            document,
            cellphone,
            description,
            roles,
        });
        await companyRespository_1.companyRespository.save(newCompany);
        const { password: _, ...company } = newCompany;
        return res.status(201).json({ company });
    }
    async getCompanies(req, res) {
        const companies = await companyRespository_1.companyRespository.find({
            relations: {
                products: true,
                wallet: true,
            },
        });
        await companies.map((company) => company === null || company === void 0 ? true : delete company.password);
        return res.json(companies);
    }
    async show(req, res) {
        if (req.params.id) {
            const company = await companyRespository_1.companyRespository.findOne({
                relations: {
                    products: true,
                    wallet: true,
                },
                where: { id: req.params.id },
            });
            await (company === null || company === void 0 ? true : delete company.password);
            return res.json({ company });
        }
        return res.status(400).json({ error: "lista de usuários não encontrado" });
    }
    async update(req, res) {
        if (req.params.id) {
            const company = await companyRespository_1.companyRespository.findOne({
                where: { id: req.params.id },
            });
            if (!(company === null || company === void 0 ? void 0 : company.stripe_customer) && !(company === null || company === void 0 ? void 0 : company.stripe_subscription)) {
                await companyRespository_1.companyRespository.merge(company, req.body);
                const result = await companyRespository_1.companyRespository.save(company);
                delete result.password;
                return res.json({ company: result });
            }
            return res
                .status(400)
                .json({ error: "finalize a assinatura para exibir" });
        }
        return res.status(400).json({ ßerror: "id não encontrado" });
    }
    async destroy(req, res) {
        if (req.params.id) {
            await companyRespository_1.companyRespository.delete({ id: req.params.id });
            return res
                .status(201)
                .json({ error: "usuario não faz mas parte no grupo" });
        }
        return res.status(400).json({ error: "erro ao tentar excluir usuário" });
    }
}
exports.CompanyController = CompanyController;
