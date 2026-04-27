import React from 'react'
import PropTypes from 'prop-types'

class NotificationItem extends React.PureComponent {
  render() {
    const { type, html, value, markAsRead } = this.props
    const textColor =
      type === 'urgent'
        ? 'text-[var(--urgent-notification-item)]'
        : 'text-[var(--default-notification-item)]'

    return (
      <li
        data-notification-type={type}
        className={textColor}
        onClick={markAsRead}
      >
        {value ? value : <span dangerouslySetInnerHTML={html} />}
      </li>
    )
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
}

NotificationItem.defaultProps = {
  type: 'default',
  markAsRead: () => {},
}

export default NotificationItem