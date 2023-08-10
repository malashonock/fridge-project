const jestConfig = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rjxs|@ngrx)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.module.ts',
    '!src/app/**/index.ts',
    '!src/app/**/mocks/*',
    '!src/app/**/models/*',
  ],
  coverageDirectory: '<rootDir>/coverage',
  moduleNameMapper: {
    "^core/(.*)": ["<rootDir>/src/app/core/$1"],
    "^shared/(.*)": ["<rootDir>/src/app/shared/$1"],
    "^utils/(.*)": ["<rootDir>/src/app/utils/$1"],
    "^mocks/(.*)": ["<rootDir>/src/app/mocks/$1"],
    "^rootDir/(.*)": ["<rootDir>/$1"]
  },
};

module.exports = jestConfig;