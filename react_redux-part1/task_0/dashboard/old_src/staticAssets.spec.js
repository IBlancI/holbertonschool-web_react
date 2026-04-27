import React from 'react';
import { render, screen, within } from '@testing-library/react';
import Notifications from './Notifications/Notifications.jsx';

test('renders the Close button image inside the Notifications close button', () => {
  const notifications = [{ id: 1, type: 'default', value: 'A' }];
  render(<Notifications displayDrawer notifications={notifications} />);
  const closeBtn = screen.getByRole('button', { name: /close/i });
  const closeImg = within(closeBtn).getByRole('img', { name: /close/i });
  expect(closeImg).toBeInTheDocument();
  expect(closeImg.getAttribute('src') || '').not.toEqual('');
});
