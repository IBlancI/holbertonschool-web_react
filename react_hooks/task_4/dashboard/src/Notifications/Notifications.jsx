import { memo } from 'react'
import NotificationItem from './NotificationItem'
import closeButton from '../assets/close-button.png'

const Notifications = memo(function Notifications(props) {
    const {
        displayDrawer = false,
        notifications = [],
        handleDisplayDrawer,
        handleHideDrawer,
        markNotificationAsRead } = props

    return (
        <>
            <div className={`notification-title absolute right-3 top-1 whitespace-nowrap
                ${notifications.length > 0 && displayDrawer === false ? "animate-bounce" : ""}`}
                onClick={handleDisplayDrawer}>Your notifications</div>
            {displayDrawer && (
                <div className="notification-items relative border-[3px] border-dotted border-[color:var(--main-color)] p-1.5 w-1/4 float-right mt-7 right-3 p-1.5 w-[380px] max-[912px]:w-full max-[912px]:fixed max-[912px]:top-0 max-[912px]:left-0 max-[912px]:right-0 max-[912px]:bottom-0 max-[912px]:z-50 max-[912px]:float-none max-[912px]:m-0 max-[912px]:p-3 max-[912px]:bg-white max-[912px]:overflow-y-hidden max-[912px]:h-screen max-[430px]:overflow-y-hidden max-[430px]:h-screen">
                    {notifications.length === 0 ? (
                        <p className="max-[912px]:text-[20px]">No new notification for now</p>
                    ) : (
                        <>
                            <div className="relative">
                                <p className='m-0 max-[912px]:text-[20px]'>Here is the list of notifications</p>
                                <button className="absolute cursor-pointer right-0 top-0 bg-transparent"
                                    onClick={handleHideDrawer}
                                    aria-label='Close'>
                                    <img src={closeButton} alt="close-button" className="w-3 h-3" />
                                </button>
                                <ul className='list-[square] pl-5 max-[912px]:p-0 max-[912px]:list-none'>
                                    {notifications.map((notification) => (
                                        <NotificationItem
                                            key={notification.id}
                                            type={notification.type}
                                            value={notification.value}
                                            html={notification.html}
                                            markAsRead={markNotificationAsRead}
                                            id={notification.id}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
})
export default Notifications