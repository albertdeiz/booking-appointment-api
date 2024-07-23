import { UserRepository } from "./userRepository";
import { User } from "../entities/user";
import { prisma } from "../../../infrastructure/database/prismaClient";

export class UserRepositoryImpl implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password, // Note: Ensure password hashing in real applications
      },
    });

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return user
      ? new User(user.id, user.name, user.email, user.password)
      : null;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      (user) => new User(user.id, user.name, user.email, user.password)
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password, // Note: Ensure password hashing in real applications
      },
    });

    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id: id },
    });
  }
}
