module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/infrastructure/database/test/singleton.ts",
  ],
};
