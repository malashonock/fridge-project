const jestConfig = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rjxs|@ngrx)'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    "^core/(.*)": ["<rootDir>/src/app/core/$1"],
    "^shared/(.*)": ["<rootDir>/src/app/shared/$1"],
    "^utils/(.*)": ["<rootDir>/src/app/utils/$1"],
    "^rootDir/(.*)": ["<rootDir>/$1"]
  },
};

module.exports = jestConfig;