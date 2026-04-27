import { memo } from 'react';
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  default: {
    color: "blue",
    "@media (max-width: 900px)": {
      width: "100%",
      borderBottom: "1px solid black",
      fontSize: "20px",
      padding: "10px 8px",
      listStyle: "none",
    },
  },
  urgent: {
    color: "red",
    "@media (max-width: 900px)": {
      width: "100%",
      borderBottom: "1px solid black",
      fontSize: "20px",
      padding: "10px 8px",
      listStyle: "none",
    },
  },
});

// Single notification row - color depends on type (default=blue, urgent=red)
const NotificationItem = memo(function NotificationItem({
  id,
  type,
  value,
  markAsRead,
}) {
  const itemStyle = type === "default" ? styles.default : styles.urgent;

  return (
    <li
      className={css(itemStyle)}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
