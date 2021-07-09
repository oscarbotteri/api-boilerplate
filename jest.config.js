module.exports = {
  preset: '@shelf/jest-mongodb',
  verbose: true,
  clearMocks: true,
  collectCoverage: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: '/coverage',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
};
