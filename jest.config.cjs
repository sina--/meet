module.exports = {
  // comment out when running e2e tests
  testEnvironment: 'jest-environment-jsdom',
  // uncomment when running e2e tests
  // preset: "jest-puppeteer",
  transform: {
    '^.+\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
}; 