// task_3/dashboard/src/utils.spec.js
import {
  getCurrentYear,
  getFooterCopy,
  getLatestNotification,
} from './utils.js';

describe('utils', () => {
  test('getCurrentYear returns the current year', () => {
    const y = new Date().getFullYear();     // évite la "time bomb"
    expect(getCurrentYear()).toBe(y);
  });

  test.each([
    [true,  'Holberton School'],
    [false, 'Holberton School main dashboard'],
  ])('getFooterCopy(%s) returns "%s"', (arg, expected) => {
    expect(getFooterCopy(arg)).toBe(expected);
  });

  test('getLatestNotification returns the required HTML string', () => {
    expect(getLatestNotification())
      .toBe('<strong>Urgent requirement</strong> - complete by EOD');
  });
});
