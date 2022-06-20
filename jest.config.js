module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
  testMatch: ['**/*spec.(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ['./node_modules/'],
  testTimeout: 61000,
  clearMocks: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js', 'jest-canvas-mock'],
  testEnvironment: 'jsdom',
};
