import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', '<rootDir/>/src'],
  transformIgnorePatterns: ['node_modules/(?!@angular|rjxs|@ngrx)'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
};

export default jestConfig;