const nextJest = require('next/jest');

const babelConfigMacros = {
  presets: [['next/babel']],
  plugins: [require.resolve('babel-plugin-macros')],
};

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/context/(.*)$': '<rootDir>/context/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': ['babel-jest', babelConfigMacros],
  },
};

const createJestConfig = nextJest({
  dir: './',
});

module.exports = createJestConfig(customJestConfig);
