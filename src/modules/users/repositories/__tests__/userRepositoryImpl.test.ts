import { prismaMock } from "../../../../infrastructure/database/test/singleton";
import { User } from "../../entities/user";
import { UserRepositoryImpl } from "../userRepositoryImpl";

const mockUser = new User(
  1,
  "Usuario",
  "mail@domain.com",
  "112233",
  "+56977273879"
);

const mockUserDb = {
  id: mockUser.id,
  name: mockUser.name,
  email: mockUser.email,
  password: mockUser.password,
  phone: mockUser.phone ?? null,
  updatedAt: mockUser.updatedAt,
  createdAt: mockUser.createdAt,
};

describe("UserRepositoryImpl - tests", () => {
  const repository = new UserRepositoryImpl();

  it("should create new user", async () => {
    prismaMock.user.create.mockResolvedValue(mockUserDb);

    await expect(repository.create(mockUser)).resolves.toEqual(mockUser);
  });

  it("should find a user by id", async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserDb);

    await expect(repository.findById(1)).resolves.toEqual(mockUser);
  });

  it("should get all users", async () => {
    prismaMock.user.findMany.mockResolvedValue([mockUserDb]);

    const result = await repository.findAll();

    expect(result).toHaveLength(1);
  });

  it("should update a user", async () => {
    const testUpdatedMock = "updated name";
    prismaMock.user.update.mockResolvedValue({
      ...mockUserDb,
      name: testUpdatedMock,
    });

    const { name } = await repository.update(mockUser);

    expect(name).toBe(testUpdatedMock);
  });

  it("should delete a user", async () => {
    prismaMock.user.delete.mockResolvedValue(mockUserDb);

    await repository.delete(1);

    expect(prismaMock.user.delete).toHaveBeenCalledTimes(1);
  });
});
