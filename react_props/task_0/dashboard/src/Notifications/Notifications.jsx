import './Notifications.css'
import closebtn from '../assets/close-button.png'
import { getLatestNotification } from '../utils/utils'

export default function Notifications() {
  return (
    <>
      <div className="notifications">
        <p>
        Here is the list of notifications
        </p>
        <button
        style={{
          position: "absolute",
          display: "flex",
          background: "none",
          borderStyle: "none",
          right: "1rem",
          top: "0.8rem",
          width: "0.5rem",
          height: "0.5rem",
        }}
        onClick={() => console.log('Close button has been clicked')} aria-label="Close">
          <img
          style={{
            width: "0.5rem",
            height: "0.5rem",
          }}
          src={ closebtn } alt='CLose' />
        </button>
        <ul>
          <li data-priority="default">New course available</li>
          <li data-priority="urgent">New resume available</li>
          <li data-priority="urgent"
          dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
        </ul>
      </div>
    </>
  );
}