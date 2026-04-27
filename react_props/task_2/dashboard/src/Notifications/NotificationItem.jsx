export default function NotificationItem({ type = 'default', html, value }) {
  const style = { color: type === 'urgent' ? 'red' : 'blue' };

  if (html) {
    return (
      <li
        data-notification-type={type}
        style={style}
        dangerouslySetInnerHTML={html}
      />
    );
  }

  return (
    <li data-notification-type={type} style={style}>
      {value}
    </li>
  );
}