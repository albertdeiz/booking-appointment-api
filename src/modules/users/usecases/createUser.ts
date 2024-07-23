import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";

export class CreateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    // Implement business logic for creating a user
    return await this.userRepository.create(user);
  }
}
