import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductUseCase } from "./UpdateProductUseCase";
import { AppError } from "../../../../errors/AppError";

export class UpdateProductController {
  static async handle(request: Request, response: Response): Promise<void> {
    try {
      const data = request.body;

      const updateProductUseCase = container.resolve(UpdateProductUseCase);
      const product = await updateProductUseCase.execute(data);

      response.status(200).json(product);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        response.status(err.statusCode).json({ message: err.message });
      } else if (err instanceof Error) {
        response.status(500).json({ message: err.message });
      } else {
        response.status(500).json({ message: "Erro interno do servidor" });
      }
    }
  }
}
