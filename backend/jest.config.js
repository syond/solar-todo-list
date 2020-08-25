module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/app/**/*.js'],
    coverageDirectory: "tests/coverage",
    coverageReporters: [
        "text",
        "lcov",
    ],
    testEnvironment: "node",
    testMatch: [
        "**/tests/**/*.test.js?(x)",
    ],
}