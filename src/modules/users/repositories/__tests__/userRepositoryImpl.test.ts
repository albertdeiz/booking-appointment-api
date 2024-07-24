import { prisma } from "../../../../infrastructure/database/prismaClient";
import { User } from "../../entities/user";
import { UserRepositoryImpl } from "../userRepositoryImpl";

describe("UserRepositoryImpl - tests", () => {
  const repository = new UserRepositoryImpl();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should create an user", async () => {
    const user = new User(
      1,
      "Usuario",
      "mail@domain.com",
      "112233",
      "+56977273879"
    );
    const result = await repository.create(user);

    expect(result).toEqual({
      ...user,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    });
  });

  it("should update an user", async () => {
    const user = new User(
      1,
      "Usuario editado",
      "mail_editado@domain.com",
      "112233",
      "+56977273879"
    );
    const result = await repository.update(user);

    expect(result).toEqual({
      ...user,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    });
  });

  it("should list all user", async () => {
    const result = await repository.findAll();

    expect(result).toHaveLength(1);
  });

  it("should find user by id", async () => {
    const user = new User(
      1,
      "Usuario editado",
      "mail_editado@domain.com",
      "112233",
      "+56977273879"
    );

    const result = await repository.findById(1);

    expect(result).toEqual({
      ...user,
      updatedAt: result?.updatedAt,
      createdAt: result?.createdAt,
    });
  });

  it("should not find user by id", async () => {
    const result = await repository.findById(2);

    expect(result).toEqual(null);
  });

  it("should delete an user", async () => {
    await repository.delete(1);
    const result = await repository.findById(1);

    expect(result).toEqual(null);
  });
});