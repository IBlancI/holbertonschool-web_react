import React, { memo } from "react";
import PropTypes from "prop-types";

function NotificationItem({ id, type, value, html, markAsRead }) {
  const colorStyle = {
    color:
      type === "default"
        ? "var(--default-notification-item)"
        : "var(--urgent-notification-item)",
  };

  const handleClick = () => {
    if (markAsRead) markAsRead(id);
  };

  return (
    <li
      data-testid="notification-item"
      style={colorStyle}
      data-notification-type={type}
      dangerouslySetInnerHTML={html ? html : undefined}
      onClick={handleClick}
    >
      {!html ? value : null}
    </li>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.oneOf(["default", "urgent"]).isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func.isRequired,
};

NotificationItem.defaultProps = {
  type: "default",
  value: "",
  html: undefined,
};

export default memo(NotificationItem);
