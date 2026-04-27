import { memo } from 'react'

const NotificationItem = memo(function NotificationItem({
  markAsRead = () => null,
  type = 'default',
  html = null,
  value = '',
  id = 1
}) {
  if (type === 'default') {
    return (
      <li
        onClick={() => markAsRead(id)}
        data-notification-type={type}
        className="text-[color:var(--default-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]"
      >
        {value}
      </li>
    )
  }

  if (type === 'urgent' && html) {
    return (
      <li
        onClick={() => markAsRead(id)}
        data-notification-type={type}
        dangerouslySetInnerHTML={html}
        className="text-[color:var(--urgent-notification-item)] pl-1 max-[912px]:text-[20px] max-[912px]:w-full max-[912px]:border-b max-[912px]:border-black max-[912px]:p-[10px_8px]"
      />
    )
  }

  if (type === 'urgent') {
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

  return null
})

export default NotificationItem