import type { Config } from "jest";
const config: Config = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^.+\\.svg$": "<rootDir>/src/config/file-transform.js"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  modulePaths: ["<rootDir>/src"],
  moduleNameMapper: {
    "^.+\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"]
};

export default config;
