import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import closeIcon from '../../assets/close-button.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import {
  fetchNotifications,
  markNotificationAsRead as markAsRead,
  handleDisplayDrawer as displayDrawerAction,
  handleHideDrawer as hideDrawerAction,
} from '../../features/notifications/notificationsSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);
  const loading = useSelector((state) => state.notifications.loading);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = (id) => {
    dispatch(markAsRead(id));
  };

  const onDisplayDrawer = () => {
    dispatch(displayDrawerAction());
  };

  const onHideDrawer = () => {
    dispatch(hideDrawerAction());
  };

  const shouldBounce = notifications.length > 0 && !displayDrawer;

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
          onClick={onDisplayDrawer}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onDisplayDrawer();
          }}
        >
          Your notifications
        </div>

        {displayDrawer && (
          <div
            className="relative mt-1 inline-block p-2 border border-dotted rounded-none bg-white w-[520px] text-left"
            style={{ borderColor: 'var(--main-color)' }}
          >
            {loading ? (
              <p className="m-0">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="notifications-empty m-0">No new notification for now</p>
            ) : (
              <>
                <p className="text-base mb-2 m-0">Here is the list of notifications</p>

                <button
                  aria-label="Close"
                  className="absolute top-2 right-2"
                  onClick={onHideDrawer}
                >
                  <img src={closeIcon} alt="Close" className="w-3 h-3" />
                </button>

                <ul className="notifications-list">
                  {notifications.map((n) => (
                    <NotificationItem
                      key={n.id}
                      id={n.id}
                      type={n.type}
                      value={n.value}
                      html={n.html}
                      markAsRead={() => handleMarkAsRead(n.id)}
                      markNotificationAsRead={handleMarkAsRead}
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
