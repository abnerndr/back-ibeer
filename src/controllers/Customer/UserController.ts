import { Request, Response } from "express";
import { BadRequestError } from "../../helpers/api-erros";
import { userRepository } from "../../repositories/userRepository";
import bcrypt from "bcrypt";
export class UserController {

  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      throw new BadRequestError("E-mail já existe");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(newUser);

    const { password: _, ...user } = newUser;

    return res.status(201).json({ user });
  }

  async index(res: Response) {
    const user = await userRepository.find();
    return res.json({ user });
  }

  async show(req: Request, res: Response) {
    if (req.params.id) {
      const user = await userRepository.findOne({
        where: { id: req.params.id },
      });
      return res.json({ user });
    }
    return res.status(400).json({ error: "lista de usuários não encontrado" });
  }

  async update(req: Request, res: Response) {
    if (req.params.id) {
      const user: any = await userRepository.findOne({
        where: { id: req.params.id },
      });
      await userRepository.merge(user, req.body);
      const result = await userRepository.save(user);
      return res.json({ user: result });
    }

    return res.status(400).json({ error: "id não encontrado" });
  }

  async destroy(req: Request, res: Response) {
    if (req.params.id) {
      await userRepository.delete({ id: req.params.id });
      return res
        .status(201)
        .json({ error: "usuario não faz mas parte no grupo" });
    }
    return res.status(400).json({ error: "erro ao tentar excluir usuário" });
  }
}
