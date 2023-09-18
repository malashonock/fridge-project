module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  moduleDirectories: [
    "node_modules",
    "<rootDir>/projects/fridge-shell-app/src",
  ],
  transformIgnorePatterns: ["node_modules/(?!@angular|rjxs|@ngrx)"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/projects/fridge-shell-app/src/app/**/*.ts",
    "!<rootDir>/projects/fridge-shell-app/src/app/**/*.module.ts",
    "!<rootDir>/projects/fridge-shell-app/src/app/**/index.ts",
    "!<rootDir>/projects/fridge-shell-app/src/app/**/{mocks,models}/**/*",
  ],
  coverageDirectory: "<rootDir>/coverage",
  moduleNameMapper: {
    "^@shell/environments/(.*)": [
      "<rootDir>/projects/fridge-shell-app/src/environments/$1",
    ],
    "^fridge-shared-lib": ["<rootDir>/dist/fridge-shared-lib"],
    "^@shared/(.*)": ["<rootDir>/projects/fridge-shared-lib/src/lib/$1"],
    "^@shell/(.*)": ["<rootDir>/projects/fridge-shell-app/src/app/$1"],
    "^rootDir/(.*)": ["<rootDir>/$1"],
  },
};
