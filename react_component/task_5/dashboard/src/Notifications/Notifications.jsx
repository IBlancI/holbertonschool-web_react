import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Notifications.css';
import closebtn from '../assets/close-button.png';
import NotificationItem from './NotificationItem';

// export default function Notifications({
//   notifications = [],
//   displayDrawer = false, // <= par défaut false (exigence Task 5)
// }) {

export default class Notifications extends Component {
  static propTypes = {
    notifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        type: PropTypes.string,
        value: PropTypes.string,
        html: PropTypes.shape({ __html: PropTypes.string }),
      })
    ),
    displayDrawer: PropTypes.bool,
  };

  // par défaut false (exigence Task 5)
  static defaultProps = {
    notifications: [],
    displayDrawer: false,
  };

  /** IMPORTANT (Task 7):
   *  Ne re-render que si la longueur de notifications change
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.notifications.length !== this.props.notifications.length;
  }

  // méthode demandée par l'exo
  markAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
  };

  render() {
    const { notifications, displayDrawer } = this.props;

  // Titre toujours visible
  const Title = (
    <div className="notification-title" data-testid="notifications-title">
      <p>Your notifications</p>
    </div>
  );

  // Contenu du tiroir (uniquement si displayDrawer === true)
  const Drawer = displayDrawer ? (
    <div className="notifications">
      <div className="notification-items">
        {notifications.length > 0 ? (
          <>
            <p>Here is the list of notifications</p>
            <button
              onClick={() => console.log('Close button has been clicked')}
              aria-label="Close"
              className="notifications-close"
            >
              <img src={closebtn} alt="Close" />
            </button>
            <ul>
              {notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  id={n.id}
                  type={n.type}
                  value={n.value}
                  html={n.html}
                  markAsRead={this.markAsRead}
                />
              ))}
            </ul>
          </>
        ) : (
          <p className="notifications-empty">No new notification for now</p>
        )}
      </div>
    </div>
  ) : null;

  return (
    <>
      {Title}
      {Drawer}
    </>
  );
}
}
