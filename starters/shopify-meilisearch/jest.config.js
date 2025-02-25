const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e"],
  moduleDirectories: ["node_modules", "<rootDir>"],
  moduleNameMapper: {
    "^lib/(.*)$": "<rootDir>/lib/$1",
  },
}

module.exports = createJestConfig(customJestConfig)
