import { memo } from "react";

const NotificationItem = memo(function NotificationItem({
  type,
  value,
  markAsRead,
  id,
}) {
  // this console.log is only for test purposes and not mentionned/required in the student code
  return (
    <li
      style={{ color: type === 'urgent' ? 'red' : 'blue' }}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
