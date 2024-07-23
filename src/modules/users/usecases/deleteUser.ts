import { UserRepository } from "../repositories/userRepository";

export class DeleteUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: number): Promise<void> {
    // Implement business logic for deleting a user
    await this.userRepository.delete(id);
  }
}
