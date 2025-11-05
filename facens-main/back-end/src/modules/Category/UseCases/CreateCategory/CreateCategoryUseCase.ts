import { injectable, inject } from "tsyringe";
import { CategoryDTO } from "../../DTOs/CategoryDTO";
import { AppError } from "../../../../errors/AppError";
import { Categories } from "../../entities/Categories";
import { ICategoryRepository } from "../../Repository/ICategoryRepository";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: CategoryDTO): Promise<Categories> {

    console.log(data);


    if (!data.name) {
      throw new AppError("Nome é obrigatório", 400);
    }

    if (!data.description) {
      throw new AppError("Descrição é obrigatória", 400);
    }

    const categoryAlreadyExists = await this.categoryRepository.findByName(data.name);

    if (categoryAlreadyExists) {
      throw new AppError("Categoria já existe", 400);
    } 

    const descriptionAlreadyExists = await this.categoryRepository.findByDescription(data.description);

    if (descriptionAlreadyExists) {
      throw new AppError("Descrição já existe", 400);
    }

    data.name = data.name.toUpperCase();
    data.description = data.description.toUpperCase();


    return this.categoryRepository.create(data);
  }
}
