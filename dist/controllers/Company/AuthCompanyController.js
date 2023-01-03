"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCompanyController = void 0;
const companyRespository_1 = require("../../repositories/companyRespository");
const api_erros_1 = require("../../helpers/api-erros");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthCompanyController {
    async login(req, res) {
        const { email, password } = req.body;
        const company_user = await companyRespository_1.companyRespository.findOneBy({ email });
        if (!company_user) {
            throw new api_erros_1.BadRequestError("E-mail ou senha inválidos");
        }
        const verifyPass = await bcrypt_1.default.compare(password, company_user.password);
        if (!verifyPass) {
            throw new api_erros_1.BadRequestError("E-mail ou senha inválidos");
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
        let data = {
            id: company_user.id,
        };
        const token = jsonwebtoken_1.default.sign(data, jwtSecretKey, { expiresIn: "8h" });
        const { password: _, ...userLogin } = company_user;
        return res.status(200).json({
            company: userLogin,
            token: token,
        });
    }
}
exports.AuthCompanyController = AuthCompanyController;
