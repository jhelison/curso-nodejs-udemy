import AppError from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import User from '../typeorm/entities/User'
import UsersRepository from '../typeorm/repositories/UserRepository'

interface IRequest {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({ email, name, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository)

        const emailExists = await usersRepository.findByEmail(email)
        if (emailExists) {
            throw new AppError('Email already used')
        }

        const hasehdPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hasehdPassword,
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService
