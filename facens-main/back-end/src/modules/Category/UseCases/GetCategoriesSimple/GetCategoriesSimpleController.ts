import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { GetCategoriesSimpleUseCase } from "./GetCategoriesSimpleUseCase";

export class GetCategoriesSimpleController {
  static async handle(
    request: Request,
    response: Response,
  ): Promise<void> {
    try {

      const getCategoriesSimpleUseCase = container.resolve(GetCategoriesSimpleUseCase);
      const productClasses = await getCategoriesSimpleUseCase.execute();

      response.status(201).json(productClasses);
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
