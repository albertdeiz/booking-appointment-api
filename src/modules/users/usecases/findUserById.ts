import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";

export class FindUserById {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<User | null> {
    // Implement business logic for finding a user by ID
    return await this.userRepository.findById(id);
  }
}
