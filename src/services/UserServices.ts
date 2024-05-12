// services/UserServices.ts
import { UserRepository } from "../database/UserDataBase";
import { User } from "../model/User";
import { CustomError } from "../errors/CustomError";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new CustomError(404, "Usuario não encontrado");
    }
    return user;
  }

  async getAllUsers(currentUser: User): Promise<User[]> {
    if (currentUser.role !== 'ADMIN') {
      throw new CustomError(403, "Não autorizado! Só os ADMIM tem acesso");
    }
    const users = await this.userRepository.getAllUsers();
    return users;
  }
}
