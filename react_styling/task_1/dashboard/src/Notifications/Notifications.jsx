import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import NotificationItem from './NotificationItem.jsx';
import closeIcon from '../assets/close-button.png';

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length > this.props.notifications.length;
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer = false, notifications = [] } = this.props;

    return (
      <>
        <div className="notification-title">Your notifications</div>

        {displayDrawer && (
          <div className="Notifications">
            <button
              aria-label="Close"
              onClick={() => console.log('Close button has been clicked')}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'none',
                cursor: 'pointer',
                border: 'none',
              }}
            >
              <img
                src={closeIcon}
                alt="close"
                style={{ width: '10px', height: '10px' }}
              />
            </button>

            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((item) => (
                    <NotificationItem
                      key={item.id}
                      id={item.id}
                      type={item.type}
                      value={item.value}
                      html={item.html}
                      markAsRead={this.markAsRead}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      type: PropTypes.string,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
};

Notifications.defaultProps = {
  displayDrawer: false,
  notifications: [],
};

export default Notifications;