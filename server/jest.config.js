module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/__tests__/api/"
  ],
  restoreMocks: true,
  coveragePathIgnorePatterns: [
    'node_modules',
    'src/config',
    'src/app.ts',
    'tests'
  ],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  globalTeardown: './jest.teardown.js',

  // Thêm reporters để xuất kết quả test ra file JSON
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: './', outputName: 'jest-results.json' }]
  ],
};
