// import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// export default function NotificationItem({ type = 'default', html, value }) {
//   const style = { color: type === 'urgent' ? 'red' : 'blue' };

//   if (html) {
//     return (
//       <li
//         data-notification-type={type}
//         style={style}
//         // html = { __html: '...' }
//         dangerouslySetInnerHTML={html}
//       />
//     );
//   }

//   return (
//     <li data-notification-type={type} style={style}>
//       {value}
//     </li>
//   );
// }

// NotificationItem.propTypes = {
//   type: PropTypes.string,
//   value: PropTypes.string,
//   html: PropTypes.shape({ __html: PropTypes.string }),
// };

export default class NotificationItem extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    type: PropTypes.string,
    value: PropTypes.string,
    html: PropTypes.shape({ __html: PropTypes.string }),
    markAsRead: PropTypes.func, // passée depuis Notifications
  };

  static defaultProps = {
    type: 'default',
    markAsRead: () => {},
  };

  handleClick = () => {
    const { id, markAsRead } = this.props;
    markAsRead(id);
  };

  render() {
    const { type, html, value } = this.props;
    const style = { color: type === 'urgent' ? 'red' : 'blue' };

    if (html) {
      return (
        <li
          data-notification-type={type}
          style={style}
          onClick={this.handleClick}
          dangerouslySetInnerHTML={html}
        />
      );
    }

    return (
      <li
        data-notification-type={type}
        style={style}
        onClick={this.handleClick}
      >
        {value}
      </li>
    );
  }
}
