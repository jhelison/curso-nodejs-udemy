import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'

interface IRequest {
    id: string
}

class DeleteProductService {
    public async execute({ id }: IRequest): Promise<void> {
        const productRepository = getCustomRepository(ProductRepository)

        const product = await productRepository.findOne(id)

        if (!product) {
            throw new AppError('Product not found')
        }

        await productRepository.remove(product)
    }
}

export default DeleteProductService
