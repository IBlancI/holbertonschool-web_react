// task_2/dashboard/src/Notifications/NotificationItem.jsx
import React, { memo } from 'react';
import PropTypes from 'prop-types';

function NotificationItem({
  id,
  type = 'default',
  value,
  html,
  markAsRead,
  markNotificationAsRead,
}) {
  const color =
    type === 'urgent'
      ? 'var(--urgent-notification-item)'
      : 'var(--default-notification-item)';

  const onClick = () => {
    if (typeof markNotificationAsRead === 'function') {
      markNotificationAsRead(id);
    } else if (typeof markAsRead === 'function') {
      markAsRead(id);
    } else {
      // fallback (comportement historique)
      // eslint-disable-next-line no-console
      console.log(`Notification ${id} has been marked as read`);
    }
  };

  return html ? (
    <li
      data-notification-type={type}
      style={{ color }}
      onClick={onClick}
      dangerouslySetInnerHTML={html}
    />
  ) : (
    <li data-notification-type={type} style={{ color }} onClick={onClick}>
      {value}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({ __html: PropTypes.string }),
  markAsRead: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

// Mémoïsation façon PureComponent :
// on ignore les changements d'identité des handlers,
// on compare seulement les données utiles à l'affichage.
const areEqual = (prev, next) => {
  if (prev.id !== next.id) return false;
  if (prev.type !== next.type) return false;
  if (prev.value !== next.value) return false;

  const prevHtml = prev.html?.__html ?? null;
  const nextHtml = next.html?.__html ?? null;
  if (prevHtml !== nextHtml) return false;

  return true; // pas de re-render sinon
};

export default memo(NotificationItem, areEqual);
