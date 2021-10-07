import Product from '@modules/products/typeorm/entities/Product'
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository'
import { getCustomRepository } from 'typeorm'

class ListProductService {
    public async create(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductRepository)

        const products = productRepository.find()

        return products
    }
}

export default ListProductService
