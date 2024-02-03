module.exports = {
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
  },
  testMatch: ['**/*.spec.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/jest/',
    '\.module\.ts$',
    '/environments/',
    '/src/main.ts',
    '/src/app/app.component.ts',
    '/src/app/app.config.ts',
    '/src/app/app.routes.ts',
    '/src/app/modules/customer/customer.routes.ts',
    '/src/app/modules/master-data/master-data.routes.ts',
    '/src/app/modules/supplier/supplier.routes.ts'
  ],
  coverageReporters: [
    'text-summary',
    'html',
    'cobertura',
    'lcov',
  ],
  coverageThreshold: {
    global: {
      lines: 10,
    }
  },
  reporters: [
    'default',
    ['jest-junit', { output: 'coverage/junit.xml' }]
  ],
  transformIgnorePatterns: ['^.+\\.js$']
};
