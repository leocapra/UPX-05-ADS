import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IProductRepository } from "../../Repository/IProductRepository";
import { Products } from "../../entities/Products";

interface UpdateProductDTO {
  id: number;
  name: string;
  code: string;
  barcode?: string;
  price: number;
  category_id: number;
}

@injectable()
export class UpdateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(data: UpdateProductDTO): Promise<Products> {
    const { id, name, code, barcode, price, category_id } = data;

    if (!id) {
      throw new AppError("ID do produto é obrigatório", 400);
    }
    if (!name) {
      throw new AppError("Nome do produto é obrigatório", 400);
    }
    if (!code) {
      throw new AppError("Código do produto é obrigatório", 400);
    }
    if (!price || price <= 0) {
      throw new AppError("Preço deve ser maior que zero", 400);
    }
    if (!category_id) {
      throw new AppError("ID da categoria é obrigatório", 400);
    }

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError("Produto não encontrado", 404);
    }

    product.name = name.toUpperCase();
    product.code = code;
    product.barcode = barcode;
    product.price = price;
    product.category_id = category_id;

    return await this.productRepository.update(product);
  }
}
