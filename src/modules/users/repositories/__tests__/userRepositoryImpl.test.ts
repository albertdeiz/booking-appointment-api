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
    const { id, email, name, password } = await repository.create(user);

    expect(id).toBe(user.id);
    expect(email).toBe(user.email);
    expect(name).toBe(user.name);
    expect(password).toBe(user.password);
  });

  it("should update an user", async () => {
    const user = new User(
      1,
      "Usuario editado",
      "mail_editado@domain.com",
      "112233",
      "+56977273879"
    );
    const { id, email, name, password } = await repository.update(user);

    expect(id).toBe(user.id);
    expect(email).toBe(user.email);
    expect(name).toBe(user.name);
    expect(password).toBe(user.password);
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

    const { id, email, name, password } = (await repository.findById(1)) ?? {};

    expect(id).toBe(user.id);
    expect(email).toBe(user.email);
    expect(name).toBe(user.name);
    expect(password).toBe(user.password);
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
