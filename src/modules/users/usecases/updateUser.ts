import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";

export class UpdateUser {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User): Promise<User> {
    // Implement business logic for updating a user
    return await this.userRepository.update(user);
  }
}
