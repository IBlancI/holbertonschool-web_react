import '@testing-library/jest-dom';
import { StyleSheetTestUtils } from 'aphrodite';

// Mock console.log to suppress WithLogging output
global.console = {
  ...console,
  log: jest.fn(),
};

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});