
module.exports = {
    testEnvironment: "node",
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    collectCoverageFrom: [
        "src/validation.js"
    ],
    coverageThreshold: {
        global: {
            statements: 50,
            branches: 50,
            functions: 50,
            lines: 50
        }
    }
};
