import { memo } from 'react'
import { getLatestNotification } from '../utils/utils'

const NotificationItem = memo(function NotificationItem(props) {
    const { markAsRead, type, html, value, id } = props
    const innerHtml = { __html: getLatestNotification() }
    if (type === "default")
        return (
            <li onClick={() => markAsRead(id)}
                data-notification-type={type}
                className="text-[color:var(--default-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]">
                {value}
            </li>
        )
    else if (type === "urgent" && html) {
        return (
            <li
                onClick={() => markAsRead(id)}
                data-notification-type={type}
                dangerouslySetInnerHTML={innerHtml}
                className="text-[color:var(--urgent-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]">
            </li>
        )
    }
    else if (type === "urgent") {
        return (
            <li
                onClick={() => markAsRead(id)}
                data-notification-type={type}
                className="text-[color:var(--urgent-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]"
            >
                {value}
            </li>
        )
    }
})

NotificationItem.defaultProps = {
  markAsRead: () => {},
  type: "default",
  html: "",
  value: "",
  id: 1
}

export default NotificationItem