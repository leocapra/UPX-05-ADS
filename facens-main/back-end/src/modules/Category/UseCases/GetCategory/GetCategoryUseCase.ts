import { injectable, inject } from "tsyringe";
import { Categories } from "../../entities/Categories";
import { ICategoryRepository } from "../../Repository/ICategoryRepository";
import { CategoryQueryDTO } from "../../DTOs/CategoryDTO";

@injectable()
export class GetCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: CategoryQueryDTO): Promise<{ items: Categories[]; total: number }> {
    const { page, limit } = data;

    if (page < 0 || limit <= 0) {
      throw new Error("Página ou limite inválido");
    }

    return this.categoryRepository.findAll(data);
  }
}
