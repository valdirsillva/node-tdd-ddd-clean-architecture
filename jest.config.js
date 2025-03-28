module.exports = {
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!**/test/**',
        '!**/data/**',
        '!**/domain/**',
        '!<rootDir>/src/**/*index.ts',
        '!<rootDir>/src/**/*protocols.ts',
        '!<rootDir>/src/mocks/**',
        '!<rootDir>/src/presentation/http/**',
        '!<rootDir>/src/infra/db/mongodb/helpers/**',
        '!<rootDir>/src/validation/protocols/**',
    ],
    coverageDirectory: 'coverage',
    testEnvironment: "node",
    preset: '@shelf/jest-mongodb',
    transform: {
        '.+\\.ts$': 'ts-jest',
    },
    moduleNameMapper: {
        '@/(.*)': '<rootDir>/src/$1'
    }

}