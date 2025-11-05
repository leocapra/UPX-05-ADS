import { injectable, inject } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IProductClassRepository } from "../../Repository/IProductClassRepository";
import { ProductClassDTO } from "../../DTOs/ProductClassDTO";
import { ProductClass } from "../../entities/ProductClass";

@injectable()
export class CreateProductClassUseCase {
  constructor(
    @inject("ProductClassRepository")
    private productClassRepository: IProductClassRepository
  ) {}

  async execute(data: ProductClassDTO): Promise<ProductClass> {


    if (!data.name) {
      throw new AppError("Nome da classe é obrigatório", 400);
    }

    if (!data.description) {
      throw new AppError("Descrição da classe é obrigatória", 400);
    }

    const productClassAlreadyExists = await this.productClassRepository.findByName(data.name);

    if (productClassAlreadyExists) {
      throw new AppError("Classe já existe", 400);
    } 

    const descriptionAlreadyExists = await this.productClassRepository.findByDescription(data.description);

    if (descriptionAlreadyExists) {
      throw new AppError("Classe já existe", 400);
    }

    data.name = data.name.toUpperCase();
    data.description = data.description.toUpperCase();

    return this.productClassRepository.create(data);
  }
}
