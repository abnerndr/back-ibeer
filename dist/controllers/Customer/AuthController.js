"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const userRepository_1 = require("../../repositories/userRepository");
const companyRespository_1 = require("../../repositories/companyRespository");
const api_erros_1 = require("../../helpers/api-erros");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    async login(req, res) {
        const repository = userRepository_1.userRepository || companyRespository_1.companyRespository;
        const { email, password } = req.body;
        const user = await repository.findOneBy({ email });
        if (!user) {
            throw new api_erros_1.BadRequestError("E-mail ou senha inválidos");
        }
        const verifyPass = await bcrypt_1.default.compare(password, user.password);
        if (!verifyPass) {
            throw new api_erros_1.BadRequestError("E-mail ou senha inválidos");
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY || "";
        let data = {
            id: user.id,
        };
        const token = jsonwebtoken_1.default.sign(data, jwtSecretKey, { expiresIn: "8h" });
        console.log("token", token);
        const { password: _, ...userLogin } = user;
        return res.status(200).json({
            user: userLogin,
            token: token,
        });
    }
}
exports.AuthController = AuthController;
