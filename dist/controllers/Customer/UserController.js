"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const api_erros_1 = require("../../helpers/api-erros");
const userRepository_1 = require("../../repositories/userRepository");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    async store(req, res) {
        const { name, email, password } = req.body;
        const userExists = await userRepository_1.userRepository.findOneBy({ email });
        if (userExists) {
            throw new api_erros_1.BadRequestError("E-mail já existe");
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = userRepository_1.userRepository.create({
            name,
            email,
            password: hashPassword,
        });
        await userRepository_1.userRepository.save(newUser);
        const { password: _, ...user } = newUser;
        return res.status(201).json({ user });
    }
    async index(res) {
        const user = await userRepository_1.userRepository.find();
        return res.json({ user });
    }
    async show(req, res) {
        if (req.params.id) {
            const user = await userRepository_1.userRepository.findOne({
                where: { id: req.params.id },
            });
            return res.json({ user });
        }
        return res.status(400).json({ error: "lista de usuários não encontrado" });
    }
    async update(req, res) {
        if (req.params.id) {
            const user = await userRepository_1.userRepository.findOne({
                where: { id: req.params.id },
            });
            await userRepository_1.userRepository.merge(user, req.body);
            const result = await userRepository_1.userRepository.save(user);
            return res.json({ user: result });
        }
        return res.status(400).json({ error: "id não encontrado" });
    }
    async destroy(req, res) {
        if (req.params.id) {
            await userRepository_1.userRepository.delete({ id: req.params.id });
            return res
                .status(201)
                .json({ error: "usuario não faz mas parte no grupo" });
        }
        return res.status(400).json({ error: "erro ao tentar excluir usuário" });
    }
}
exports.UserController = UserController;
