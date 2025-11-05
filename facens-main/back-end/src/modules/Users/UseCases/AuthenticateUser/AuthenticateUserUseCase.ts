import { inject, injectable } from "tsyringe";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../../Repository/IUserRepository";
import { AppError } from "../../../../errors/AppError";
interface IRequest {
  email: string;
  password: string;
  role_id: number;
}

interface IResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role_id: number;
  };
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password, role_id }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    console.log('user', user)

    if (!user) {
      throw new AppError("Credenciais inválidas: Verifique seu E-mail", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas: Verifique sua senha", 401);
    }


    const token = jwt.sign(
      {
        id: user.id,
        role_id: user.role_id,
      },
      process.env.JWT_SECRET || "default_secret",
      {
        subject: String(user.id),
        expiresIn: "1d",
      }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
      },
      token,
    };
  }
}
