import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../Repository/IUserRepository";
import { ICreateUserDTO } from "../../DTOs/UserDTO";
import { User } from "../../entities/Users";
import { AppError } from "../../../../errors/AppError";
import bcrypt from "bcryptjs";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    console.log("data use case", data);
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      throw new AppError("Email já cadastrado!", 409);
    }

    const cpfExists = await this.userRepository.findByCpf(data.cnpj);
    if (cpfExists) {
      throw new AppError("CPF/CNPJ já cadastrado!", 409);
    }


    const hashedPassword = await bcrypt.hash(data.password, 10);


    const userData: ICreateUserDTO = {
      name: data.name?.toUpperCase(),
      email: data.email?.toLowerCase(),
      password: hashedPassword,
      cnpj: data.cnpj,
      role_id: 2,
    };

    return this.userRepository.create(userData);
  }
}
