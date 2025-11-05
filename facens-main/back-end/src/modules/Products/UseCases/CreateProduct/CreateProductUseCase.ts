import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IProductRepository } from "../../Repository/IProductRepository";
import { Products } from "../../entities/Products";
import { ProductsDTO } from "../../DTOs/ProductsDTO";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(data: ProductsDTO): Promise<Products> {

    if (!data.name) {
      throw new AppError("Nome do produto é obrigatório", 400);
    }

    if (!data.price || data.price <= 0) {
      throw new AppError("Preço deve ser maior que zero", 400);
    }

    if (!data.category_id) {
      throw new AppError("ID da categoria é obrigatório", 400);
    }

    if (!data.code) {
      throw new AppError("Código do produto é obrigatório", 400);
    }


    const productNameAlreadyExists = await this.productRepository.findByName(data.name);

    if (productNameAlreadyExists) {
      throw new AppError("Classe já existe", 400);
    } 

    const productCodeAlreadyExists = await this.productRepository.findByCode(data.code);
    
    if (productCodeAlreadyExists) {
      throw new AppError("Código do produto já existe", 400);
    }

    const productBarcodeAlreadyExists = await this.productRepository.findByBarcode(data.barcode);
    
    if (data.barcode && productBarcodeAlreadyExists) {
      throw new AppError("Código de barras do produto já existe", 400);
    }

    const createProduct = {
      ...data,
      category_id: Number(data.category_id),
    }

    createProduct.name = data.name.toUpperCase();

    return this.productRepository.create(createProduct);
  }
}
