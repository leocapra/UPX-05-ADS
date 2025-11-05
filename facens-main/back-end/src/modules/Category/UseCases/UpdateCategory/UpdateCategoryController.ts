import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import { AppError } from "../../../../errors/AppError";

export class UpdateCategoryController {
  static async handle(request: Request, response: Response): Promise<void> {
    try {
      const data = request.body;

      const updateCategoryUseCase = container.resolve(UpdateCategoryUseCase);
      const updatedCategory = await updateCategoryUseCase.execute(data);

      response.status(200).json(updatedCategory);
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
