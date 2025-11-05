import { injectable, inject } from "tsyringe";
import { IProductClassRepository } from "../../Repository/IProductClassRepository";

@injectable()
export class GetProductClassesUseCase {
  constructor(
    @inject("ProductClassRepository")
    private productClassRepository: IProductClassRepository
  ) {}

  async execute(): Promise<{ id: number; name: string }[]> {
    const classes = await this.productClassRepository.findAllSimple(); // um método que só retorna id e name
    return classes;
  }
}
