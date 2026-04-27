import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import closeIcon from "../../assets/close-icon.png";
import NotificationItem from "../NotificationItem/NotificationItem";
import {
  showDrawer,
  hideDrawer,
  markNotificationAsRead,
} from "../../features/notifications/notificationsSlice";

function Notifications() {
  const dispatch = useDispatch();

  const { notifications, displayDrawer } = useSelector(
    (state) => state.notifications
  );

  const handleDisplayDrawer = () => dispatch(showDrawer());
  const handleHideDrawer = () => dispatch(hideDrawer());
  const handleMarkAsRead = (id) => dispatch(markNotificationAsRead(id));

  // --- Styles ---
  const borderStyle = {
    borderColor: "var(--main-color)",
  };

  const titleClassName = `text-right pr-8 pt-2 ${
    notifications.length > 0 && !displayDrawer ? "animate-bounce" : ""
  }`;

  return (
    <>
      <div
        className={`${titleClassName} cursor-pointer`}
        onClick={handleDisplayDrawer}
        data-testid="menuItem"
      >
        Your notifications
      </div>

      {displayDrawer && (
        <div
          className="border-2 border-dashed bg-white p-6 relative float-right mr-8 mt-2 max-w-4xl"
          style={borderStyle}
          data-testid="Notifications"
        >
          <button
            onClick={handleHideDrawer}
            aria-label="Close"
            className="absolute cursor-pointer right-3 top-3 bg-transparent border-none p-0"
          >
            <img src={closeIcon} alt="close icon" className="w-5 h-5" />
          </button>

          {notifications.length > 0 ? (
            <>
              <p className="font-bold mb-3">
                Here is the list of notifications
              </p>
              <ul className="list-disc pl-6 space-y-1">
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    type={notification.type}
                    value={notification.value}
                    html={notification.html}
                    markAsRead={() => handleMarkAsRead(notification.id)}
                    read={notification.read}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className="text-center">No new notification for now</p>
          )}
        </div>
      )}
    </>
  );
}

export default memo(Notifications);
