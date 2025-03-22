module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  bail: false,
  verbose: false,
  collectCoverage: true,
  coverageDirectory: './coverage/jest',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  coverageThreshold: {
    global: {
      statements: 80
    },
  },
  roots: [
    "<rootDir>"
  ],
  modulePaths: [
    "<rootDir>"
  ],
  moduleDirectories: [
    "node_modules"
  ],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/test.ts",
    "!src/environments/**/*.ts",
    "!src/main.ts",
    "!src/polyfills.ts",
    "!src/app/**/*.module.ts",
    "!src/app/**/*-routing.ts",
    "!src/app/guards/**",
    "!src/app/interceptors/**"
  ],
  coverageReporter: {
    dir: 'coverage',
    reporters: [
      { type: 'html' },
      { type: 'text-summary' }
    ]
  }
};
