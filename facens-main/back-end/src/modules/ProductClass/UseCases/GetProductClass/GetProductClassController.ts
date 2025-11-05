import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProductClassUseCase } from "./GetProductClassUseCase";
import { AppError } from "../../../../errors/AppError";

export class GetProductClassController {
  static async handle(
    request: Request,
    response: Response,
  ): Promise<void> {
    try {
      const data = request.body;

      const getProductClassUseCase = container.resolve(GetProductClassUseCase);
      const category = await getProductClassUseCase.execute(data);

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
