import { Request, Response } from 'express'
import { BadRequestError } from '../helpers/api-erros'
import { userRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class UserController {
	async create(req: Request, res: Response) {
		const { name, email, password } = req.body

		const userExists = await userRepository.findOneBy({ email })

		if (userExists) {
			throw new BadRequestError('E-mail já existe')
		}

		const hashPassword = await bcrypt.hash(password, 10)

		const newUser = userRepository.create({
			name,
			email,
			password: hashPassword,
		})

		await userRepository.save(newUser)

		const { password: _, ...user } = newUser

		return res.status(201).json(user)
	}

	async login(req: Request, res: Response) {
		const { email, password } = req.body


		const user = await userRepository.findOneBy({ email })

		if (!user) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		const verifyPass = await bcrypt.compare(password, user.password)

		if (!verifyPass) {
			throw new BadRequestError('E-mail ou senha inválidos')
		}

		let jwtSecretKey = process.env.JWT_SECRET_KEY || '';
		let data = {
			id: user.id,
		}

		const token = jwt.sign(data, jwtSecretKey, ({ expiresIn: '8h' }));
		console.log('token', token)

		const { password: _, ...userLogin } = user

		return res.status(200).json({
			user: userLogin,
			token: token,
		})
	}

	async updateProfile(req: Request, res: Response) {
		if (req.params.id) {
			const user: any = await userRepository.findOne({ where: { id: req.params.id } })
			await userRepository.merge(user, req.body);
			const result = await userRepository.save(user);
			return res.json({ user: result })
		}
	}

	async deleteProfile(req: Request, res: Response) {
		if (req.params.id) {
			await userRepository.delete({ id: req.params.id })
			res.json({
				message: "usuario não faz mas parte no grupo"
			})
		}
	}

	async getProfileById(req: Request, res: Response) {
		if (req.params.id) {
			const user = await userRepository.findOne({ where: { id: req.params.id } })
			return res.json({ user })
		} else {
			return await userRepository.find()
		}
	}

	async getProfile(req: Request, res: Response) {
		const user = await userRepository.find()
		return res.json(user)
	}


}