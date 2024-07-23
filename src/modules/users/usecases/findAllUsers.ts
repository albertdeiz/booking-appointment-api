import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";

export class FindAllUsers {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    // Implement business logic for finding all users
    return await this.userRepository.findAll();
  }
}
