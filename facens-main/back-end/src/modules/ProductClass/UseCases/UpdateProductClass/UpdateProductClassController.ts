import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductClassUseCase } from "./UpdateProductClassUseCase";
import { AppError } from "../../../../errors/AppError";

export class UpdateProductClassController {
  static async handle(request: Request, response: Response): Promise<void> {
    try {
      const data = request.body;

      const updateProductClassUseCase = container.resolve(UpdateProductClassUseCase);
      const updatedProductClass = await updateProductClassUseCase.execute(data);

      response.status(200).json(updatedProductClass);
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
