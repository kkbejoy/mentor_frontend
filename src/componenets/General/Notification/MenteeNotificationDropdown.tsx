import { BellIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDot from "../Notification/NotificationDot";
import { getTimeDifference } from "../../../utilities/timeManagementFunctions";
import { useDispatch } from "react-redux";
import { markAsRead } from "../../../slices/MenteeSlices/menteeNotificationSlice";

function NotificationDropdown({ notifications, newNotification }) {
  // console.log("Notifications", notifications);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleDropdown = () => {
    if (!isOpen) {
      dispatch(markAsRead());
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative group">
      {/* Trigger for the dropdown */}
      <button
        onClick={toggleDropdown}
        className=" flex items-center relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-gray-800"
      >
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        {notifications.isRead ? null : <NotificationDot />}
      </button>

      {/* Notification dropdown */}
      <div
        className={`absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto   ${
          isOpen ? "" : "hidden"
        }`}
      >
        {/* Notification items */}
        <div className="p-2 m-2">
          {/* Map through your notifications and render them here */}
          {/* Example: */}

          {/* Sorting has to be done here. */}
          {notifications?.notifications.length !== 0 ? (
            notifications?.notifications
              ?.map((notification) => {
                if (notification?.type === "message") {
                  // console.log("Messssss", notification);
                  return (
                    <div className="py-2 border-b" key={notification?._id}>
                      <Link
                        to={`http://localhost:5173/mentees/connect/inbox/${notification?.conversationId}`}
                      >
                        <p className="text-sm">{notification?.content}</p>
                        <p className="text-right text-xs">
                          {notification.time}
                        </p>
                      </Link>
                    </div>
                  );
                } else if (notification?.type === "alert") {
                  const time = getTimeDifference(notification.createdAt);
                  return (
                    <div className="py-2 border-b" key={notification.id}>
                      <p className="text-sm">{` ${notification?.content}`}</p>
                      <p className="text-right text-xs">{time}</p>
                    </div>
                  );
                }
              })
              .reverse()
          ) : (
            <div className="py-2 border-b">
              <p className="text-sm">No new notifications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationDropdown;
