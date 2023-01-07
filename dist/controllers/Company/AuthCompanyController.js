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
const sendEmail_1 = require("../../utils/sendEmail");
const crypto_1 = __importDefault(require("crypto"));
class AuthCompanyController {
    async login(req, res) {
        const { email, password } = req.body;
        const company_user = await companyRespository_1.companyRespository.findOneBy({ email });
        // if (!company_user?.stripe_customer && !company_user?.stripe_subscription) {
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
        // }
    }
    async forgot(req, res) {
        const company = await companyRespository_1.companyRespository.findOne({
            where: { email: req.body.email },
        });
        if (!company)
            res.status(400).send("User doesnot exists");
        // creating a string and hashing using bcrypt
        let token = crypto_1.default.randomBytes(32).toString("hex");
        let hashToken = await bcrypt_1.default.hash(token, Number(12));
        //creating expiry after 1 hour
        let expiry = new Date(Date.now() + 1 * 3600 * 1000);
        const reset = {
            email: req.body.email,
            token,
            expiration: expiry,
            used: 1,
        };
        console.log(reset);
        const newToken = await companyRespository_1.resetTokenRepository.create({
            email: req.body.email,
            token,
            expiration: expiry,
            used: 1,
        });
        await companyRespository_1.resetTokenRepository.save(newToken);
        //updating the users table with resetToken and resetExpire
        const link = `https://localhost:3000/resetPassword/${company === null || company === void 0 ? void 0 : company.id}/${token}`;
        await sendEmail_1.transport
            .sendMail({
            to: company === null || company === void 0 ? void 0 : company.email,
            from: process.env.EMAIL_USER,
            subject: "reset password",
            text: `<a style=" background: linear-gradient(to right,#ffcb25 ,#ffbe1b);
        background-color: #ffcb25;
        color: #fff;
        font-family: Trebuchet MS;
        font-size: 18px;
        font-weight: 800;
        font-style: normal;
        text-decoration: none;
        padding: 14px 15px;
        border: 0px solid #000;
        border-radius: 10px;
        display: inline-block;" href="${link}">restar a senha</a>`,
        })
            .then((info) => console.log(info))
            .catch((error) => console.log(error));
        res.status(200).send("Link sent to email");
    }
    async reset(req, res) {
        const company = await companyRespository_1.companyRespository.findOne({
            where: { id: req.params.userId },
        });
        const resetToken = companyRespository_1.resetTokenRepository.findOne({
            where: { email: company === null || company === void 0 ? void 0 : company.email },
        });
        let token = req.params.token;
        const isValid = await bcrypt_1.default.compare(token, resetToken === null || resetToken === void 0 ? void 0 : resetToken.token);
        const expire = resetToken.expiration > Date.now();
        if (isValid && expire) {
            const password = req.body.password;
            const hashPassword = await bcrypt_1.default.hash(password, Number(12));
            const newPassword = await companyRespository_1.companyRespository.create({
                ...company,
                password: hashPassword,
            });
            await companyRespository_1.companyRespository.merge(company, newPassword);
            const data = await companyRespository_1.companyRespository.save(company);
            console.log(data);
            res.status(200).send("password updated successfully");
        }
        else
            res.status(400).send("Invalid link or expired");
    }
}
exports.AuthCompanyController = AuthCompanyController;
