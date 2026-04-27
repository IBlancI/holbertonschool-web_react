import NotificationItem from './NotificationItem'
import React from 'react'

class Notifications extends React.Component {
  constructor(props) {
    super(props)
    this.markAsRead = this.markAsRead.bind(this)
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`)
  }

  shouldComponentUpdate(nextProps) {
    const currentNotifications = this.props.notifications || this.props.listNotifications || []
    const nextNotifications = nextProps.notifications || nextProps.listNotifications || []

    return (
      nextNotifications.length !== currentNotifications.length ||
      nextProps.displayDrawer !== this.props.displayDrawer
    )
  }

  render() {
    const notifications = this.props.notifications || this.props.listNotifications || []
    const { displayDrawer = true } = this.props

    return (
      <div className="pr-4">
        <p className="text-right">Your notifications</p>

        {displayDrawer && (
          <div className="relative ml-auto w-1/4 border-2 border-dashed border-[var(--main-color)] p-[6px]">
            {notifications.length > 0 ? (
              <>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => console.log('Close button has been clicked')}
                  className="absolute right-2 top-1"
                >
                  x
                </button>

                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      type={notification.type}
                      value={notification.value}
                      html={notification.html}
                      markAsRead={() => this.markAsRead(notification.id)}
                    />
                  ))}
                </ul>
              </>
            ) : (
              <p>No new notification for now</p>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Notifications
