import { injectable, inject } from "tsyringe";
import { ICategoryRepository } from "../../Repository/ICategoryRepository";

@injectable()
export class GetCategoriesSimpleUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<{ id: number; name: string }[]> {
    const classes = await this.categoryRepository.findAllSimple(); // um método que só retorna id e name
    return classes;
  }
}
