import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IProductClassRepository } from "../../Repository/IProductClassRepository";
import { ProductClass } from "../../entities/ProductClass";

interface UpdateCategoryDTO {
  id: number;
  name: string;
  description: string;
}

@injectable()
export class UpdateProductClassUseCase {
  constructor(
    @inject("ProductClassRepository")
    private productClassRepository: IProductClassRepository
  ) {}

  async execute(data: UpdateCategoryDTO): Promise<ProductClass> {
    const { id, name, description } = data;

    if (!id) {
      throw new AppError("ID da categoria é obrigatório", 400);
    }
    if (!name) {
      throw new AppError("Nome da categoria é obrigatório", 400);
    }
    if (!description) {
      throw new AppError("Descrição da categoria é obrigatória", 400);
    }

    const productClass = await this.productClassRepository.findById(id);
    if (!productClass) {
      throw new AppError("Categoria não encontrada", 404);
    }

    productClass.name = name.toUpperCase();
    productClass.description = description.toUpperCase();

    return await this.productClassRepository.update(productClass);
  }
}
