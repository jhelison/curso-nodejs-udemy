import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '@config/auth'

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

const isAuthenticated = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError('User is not authenticated', 401)
    }

    try {
        const [, token] = authHeader.split(' ')
        const decodeToken = verify(token, authConfig.jwt.secret)

        const { sub } = decodeToken as TokenPayload

        request.user = {
            id: sub,
        }

        return next()
    } catch (error) {
        throw new AppError('Invalid JWT Token')
    }
}

export default isAuthenticated
