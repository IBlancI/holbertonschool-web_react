import { getCurrentYear, getFooterCopy, getLatestNotification } from "./utils";

test('Returns the correct year', () => {
  expect(getCurrentYear()).toBe(2025);
});

test('Returns the correct string when the argument is true or false', () => {
  let isIndex = true;
  expect(getFooterCopy(isIndex)).toBe('Holberton School');
  isIndex = false;
  expect(getFooterCopy(isIndex)).toBe('Holberton School main dashboard');
});

test('Returned string form', () => {
  const result = getLatestNotification();
  expect(result).toBe('<strong>Urgent requirement</strong> - complete by EOD');
});