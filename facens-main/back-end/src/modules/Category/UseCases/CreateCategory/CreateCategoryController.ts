import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { AppError } from "../../../../errors/AppError";

export class CreateCategoryController {
  static async handle(
    request: Request,
    response: Response,
  ): Promise<void> {
    try {
      const data = request.body;

      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
      const category = await createCategoryUseCase.execute(data);

      response.status(201).json(category);
    } catch (err: unknown) {
      if (err instanceof AppError) {
        // Erros conhecidos lançados pelo AppError
        response.status(err.statusCode).json({
          message: err.message,
        });
      } else if (err instanceof Error) {
        // Erros nativos ou do TypeORM
        response.status(500).json({
          message: err.message,
        });
      } else {
        // Qualquer outro tipo de erro
        response.status(500).json({
          message: "Erro interno do servidor",
        });
      }
    }
  }
}
