module.exports = {
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel to transform JavaScript and JSX files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  testEnvironment: 'jsdom', // Simulate a browser environment for React components
};
