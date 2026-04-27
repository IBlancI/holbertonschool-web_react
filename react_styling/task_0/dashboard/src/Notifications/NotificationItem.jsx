import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends PureComponent {
  render() {
    const {
      type = 'default',
      value = '',
      html = null,
      markAsRead = () => {},
      id,
    } = this.props;

    const style = {
      color: type === 'urgent' ? 'red' : 'blue',
    };

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={style}
          onClick={() => markAsRead(id)}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        style={style}
        onClick={() => markAsRead(id)}
      >
        {value}
      </li>
    );
  }
}

NotificationItem.propTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  value: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func,
};

NotificationItem.defaultProps = {
  id: 0,
  type: 'default',
  value: '',
  html: null,
  markAsRead: () => {},
};

export default NotificationItem;