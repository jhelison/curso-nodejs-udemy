import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import '@shared/typeorm'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

app.use(errors())

app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            })
        }

        return response.json({
            status: 'error',
            message: error.message,
        })
    },
)

app.listen(3333, () => {
    console.log('Server is running on port 3333!')
})
