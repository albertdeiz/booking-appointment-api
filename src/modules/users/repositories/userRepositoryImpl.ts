import { UserRepository } from "./userRepository";
import { User } from "../entities/user";
import { prisma } from "../../../infrastructure/database/prismaClient";
import { User as PrismaUser } from "@prisma/client";

export class UserRepositoryImpl implements UserRepository {
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password, // Note: Ensure password hashing in real applications
        phone: user.phone,
      },
    });

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      createdUser.phone ?? undefined,
      createdUser.updatedAt,
      createdUser.createdAt
    );
  }

  async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return user
      ? new User(
          user.id,
          user.name,
          user.email,
          user.password,
          user.phone ?? undefined,
          user.updatedAt,
          user.createdAt
        )
      : null;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users.map(
      (user: PrismaUser) =>
        new User(user.id, user.name, user.email, user.password)
    );
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        password: user.password, // Note: Ensure password hashing in real applications
        phone: user.phone,
      },
    });

    return new User(
      updatedUser.id,
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.phone ?? undefined,
      updatedUser.updatedAt,
      updatedUser.createdAt
    );
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id: id },
    });
  }
}
