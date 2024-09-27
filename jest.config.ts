export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  modulePaths: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(scss)$': 'identity-obj-proxy',
    '\\.(webp|svg)$': '<rootDir>/tests/utils/image-mock.ts',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@elements(.*)$': '<rootDir>/src/elements$1',
    '^@assets(.*)$': '<rootDir>/src/assets$1',
    '^@utils(.*)$': '<rootDir>/src/utils$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
  },
};
