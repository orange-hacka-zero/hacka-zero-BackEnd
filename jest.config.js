module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",

    "@routes/(.*)": "<rootDir>/src/routes/$1",
    "@routes": "<rootDir>/src/routes/index.ts",

    "@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "@controllers": "<rootDir>/src/controllers/index.ts",

    "@services/(.*)": "<rootDir>/src/services/$1",
    "@services": "<rootDir>/src/services/index.ts",

    "@repositories/(.*)": "<rootDir>/src/repositories/$1",
    "@repositories": "<rootDir>/src/repositories/index.ts",

    "@utils/(.*)": "<rootDir>/src/utils/$1",
    "@utils": "<rootDir>/src/utils/index.ts",

    "@config/(.*)": "<rootDir>/src/config/$1",
    "@config": "<rootDir>/src/config/index.ts",

    "@middlewares/(.*)": "<rootDir>/src/middlewares/$1",
    "@middlewares": "<rootDir>/src/middlewares/index.ts",

    "@validations/(.*)": "<rootDir>/src/validations/$1",
    "@validations": "<rootDir>/src/validations/index.ts",

    "@database/(.*)": "<rootDir>/src/database/$1",
    "@interfaces/(.*)": "<rootDir>/src/interfaces/$1",
  },
};
