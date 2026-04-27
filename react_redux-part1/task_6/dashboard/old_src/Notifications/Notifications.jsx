// task_3/dashboard/src/Notifications/Notifications.jsx
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

function Notifications({
  listNotifications = [],
  notifications = [],
  displayDrawer = false,
  handleDisplayDrawer,
  handleHideDrawer,
  markNotificationAsRead = (id) => {
    // fallback simple côté navigateur
    // eslint-disable-next-line no-console
    console.log(`Notification ${id} has been marked as read`);
  },
}) {
  // ✅ accepte notifications OU listNotifications
  const items =
    (Array.isArray(notifications) && notifications.length
      ? notifications
      : listNotifications) || [];

  const shouldBounce = items.length > 0 && !displayDrawer;

  return (
    <div
      className="fixed z-50 text-right"
      style={{ position: 'fixed', top: '1rem', right: '1rem', left: 'auto' }}
    >
      <div
        className={`menuItem text-right font-normal text-base text-black ${shouldBounce ? 'animate-bounce' : ''}`}
        data-testid="notifications-title"
        role="button"
        tabIndex={0}
        onClick={() => handleDisplayDrawer && handleDisplayDrawer()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleDisplayDrawer && handleDisplayDrawer();
        }}
      >
        Your notifications
      </div>

      {displayDrawer && (
        <div
          className="relative mt-1 inline-block p-2 border border-dotted rounded-none bg-white w-[520px] text-left"
          style={{ borderColor: 'var(--main-color)' }}
        >
          {items.length === 0 ? (
            <p className="notifications-empty m-0">No new notification for now</p>
          ) : (
            <>
              <p className="text-base mb-2 m-0">Here is the list of notifications</p>

              <button
                aria-label="Close"
                className="absolute top-2 right-2"
                onClick={() =>
                  handleHideDrawer ? handleHideDrawer() : console.log('Close button has been clicked')
                }
              >
                <img src={closeIcon} alt="Close" className="w-3 h-3" />
              </button>

              <ul className="notifications-list">
                {items.map((n) => (
                  <NotificationItem
                    key={n.id}
                    id={n.id}
                    type={n.type}
                    value={n.value}
                    html={n.html}
                    /* ✅ compat legacy: le runner peut appeler markAsRead(id) */
                    markAsRead={() => markNotificationAsRead(n.id)}
                    /* ✅ compat moderne: passe la méthode telle quelle */
                    markNotificationAsRead={markNotificationAsRead}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

Notifications.propTypes = {
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({ __html: PropTypes.string }),
    })
  ),
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
};

// 🔎 Fonction de comparaison pour React.memo
// → re-render uniquement si:
//   - displayDrawer change
//   - la liste « effective » change de longueur
//   - ou que l'un des items (id/type/value/html.__html) change
const selectItems = (props) =>
  (Array.isArray(props.notifications) && props.notifications.length
    ? props.notifications
    : props.listNotifications) || [];

const areEqual = (prev, next) => {
  if (prev.displayDrawer !== next.displayDrawer) return false;

  const prevItems = selectItems(prev);
  const nextItems = selectItems(next);

  if (prevItems.length !== nextItems.length) return false;

  for (let i = 0; i < prevItems.length; i += 1) {
    const a = prevItems[i];
    const b = nextItems[i];
    if (a.id !== b.id) return false;
    if (a.type !== b.type) return false;
    if (a.value !== b.value) return false;
    const aHtml = a.html?.__html ?? null;
    const bHtml = b.html?.__html ?? null;
    if (aHtml !== bHtml) return false;
  }

  // Pas de changement pertinent → pas de re-render
  return true;
};

export default memo(Notifications, areEqual);
