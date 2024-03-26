// jest.config.js or jest.config.ts
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        // Your ts-jest configuration options here
        isolatedModules: true, // If you need this option
      },
    ],
  },
};
