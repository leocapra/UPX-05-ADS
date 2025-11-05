import { injectable, inject } from "tsyringe";
import { Categories } from "../../entities/Categories";
import { AppError } from "../../../../errors/AppError";
import { ICategoryRepository } from "../../Repository/ICategoryRepository";

interface UpdateCategoryDTO {
  id: number;
  name: string;
  description: string;
}

@injectable()
export class UpdateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: UpdateCategoryDTO): Promise<Categories> {
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

    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new AppError("Categoria não encontrada", 404);
    }

    category.name = name.toUpperCase();
    category.description = description.toUpperCase();

    return await this.categoryRepository.update(category);
  }
}
