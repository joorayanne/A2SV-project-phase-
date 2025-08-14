import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
 
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  
  
  moduleNameMapper: {
    "\\.(module\\.css|css)$": "identity-obj-proxy",

    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
      

    "^@/(.*)$": "<rootDir>/$1",
  },
  
};


export default createJestConfig(config);