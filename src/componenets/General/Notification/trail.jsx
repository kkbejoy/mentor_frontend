import { BellIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import NotificationDot from "./NotificationDot";
import { getTimeDifference } from "../../../utilities/timeManagementFunctions";
import { useDispatch } from "react-redux";
import { markAsRead } from "../../../slices/MenteeSlices/menteeNotificationSlice";
import { Menu, Transition } from "@headlessui/react";

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
    <div className=" top-16 text-right">
      <Menu as="div" className="relative inline-block text-left">
        {/* Trigger for the dropdown */}
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {notifications.isRead ? null : <NotificationDot />}
        </Menu.Button>

        {/* Notification dropdown */}

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {notifications?.notifications.length !== 0 ? (
                notifications?.notifications
                  ?.map((notification) => {
                    if (notification?.type === "message") {
                      // console.log("Messssss", notification);
                      return (
                        <Menu.Item>
                          <div
                            className="py-2 px-4 border-b"
                            key={notification?._id}
                          >
                            <Link
                              to={`http://localhost:5173/mentees/connect/inbox/${notification?.conversationId}`}
                            >
                              <p className="text-sm">{notification?.content}</p>
                              <p className="text-right text-xs">
                                {notification.time}
                              </p>
                            </Link>
                          </div>
                        </Menu.Item>
                      );
                    } else if (notification?.type === "alert") {
                      const time = getTimeDifference(notification.createdAt);
                      return (
                        <div
                          className="py-2 px-4 border-b"
                          key={notification.id}
                        >
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
            </div>{" "}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default NotificationDropdown;
