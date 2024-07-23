import { Request, Response } from "express";
import {
  CreateUser,
  DeleteUser,
  FindAllUsers,
  FindUserById,
  UpdateUser,
} from "../usecases";
import { UserRepositoryImpl } from "../repositories/userRepositoryImpl";
import { User } from "../entities/user";

const userRepository = new UserRepositoryImpl();
const createUser = new CreateUser(userRepository);
const findUserById = new FindUserById(userRepository);
const findAllUsers = new FindAllUsers(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = new User(
        0, // ID will be auto-generated
        name,
        email,
        password
      );
      const createdUser = await createUser.execute(user);
      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(500).json({ message: "Error creating user", error });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await findUserById.execute(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error finding user", error });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await findAllUsers.execute();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Error finding users", error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { name, email, password } = req.body;
      const user = new User(id, name, email, password);
      const updatedUser = await updateUser.execute(user);
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ message: "Error updating user", error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await deleteUser.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: "Error deleting user", error });
    }
  }
}
