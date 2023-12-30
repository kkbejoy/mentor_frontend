import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoutComponent from "./Logout Component/LogoutComponent";
import { logoThumbnail } from "../../constants/endpoints";
import { checkAuthentication } from "../../utilities/reusableFunctions";
import { routesFrontend } from "../../constants/frontendRoutes";
import NotificationDropdown from "../General/Notification/MenteeNotificationDropdown";
import { useDispatch, useSelector } from "react-redux";
import MenteeDropDown from "./OptionsDropdown/MenteeDropdown";
import { Link } from "react-router-dom";
import {
  getTheNumberOfUnreadMessages,
  markNotificationsAsRead,
} from "../../api/menteesConfiguration/menteeServices";
import { getMenteeNotification } from "../../slices/MenteeSlices/menteeNotificationSlice";
import { unReadNotifications } from "../../utilities/notificationsUtilities";
import { fetchTheNumberOfUnreadMesages } from "../../slices/MenteeSlices/unreadMessagesCount";
const NavbarMentee = () => {
  const [notifications, setNotifications] = useState([]); // Store new notifications
  const [previousNotifications, setPreviousNotifications] = useState([]);
  const [reRender, setRerender] = useState({});
  const dispatch = useDispatch();
  const notificationsFromApi = useSelector(
    (state) => state.menteeNotifications
  );
  const isThereUnreadNotifications = unReadNotifications(
    notificationsFromApi?.notifications
  );
  const unreadMessageCount = useSelector(
    (state) => state.MenteeSideunReadConversations.unreadCount
  );

  console.log("Notioficatiopns", unreadMessageCount);
  // const isUnreadNotifications = async;
  useEffect(() => {
    dispatch(getMenteeNotification());
    dispatch(fetchTheNumberOfUnreadMesages());
  }, [reRender]);

  const navigation = [
    { name: "Home", href: "/mentees" },
    {
      name: "Browse Mentors",
      href: routesFrontend.MentorBrowsePage,
    },
    { name: "Subscriptions", href: "/mentees/subscribed-mentors" },
    { name: "Schedules", href: "/mentees/schedules" },
    {
      name: "Raise a Ticket",
      href: "/mentees/tickets",
    },
    { name: "Connect", href: "/mentees/connect/inbox/", notify: true },
    // { name: "Applicants", href: "#", current: false },
    // { name: "Mentors List", href: "#", current: false },
  ];
  const isAuthenticated = checkAuthentication();
  // console.log("Authenticated", isAuthenticated);

  return (
    <Disclosure
      as="nav"
      className=" relative bg-mentorBlue  sticky top-0 z-10 w-full  shadow-stone-500/40"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {" "}
              <Link to={"/mentees"}>
                {" "}
                <img
                  className="h-14 w-14 rounded-full shadow-lg transition-transform hover:animate-none p-2 "
                  src={logoThumbnail}
                  alt=""
                />
              </Link>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-14 text-white">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        // href={item.href}
                        // className={classNames(
                        //   item.current
                        //     ? "bg-gray-900 text-white"
                        //     : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        //   "rounded-md px-3 py-2 text-sm font-medium"
                        // )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                        <span className="text-red-400 ml-3 text-sm">
                          {item.notify
                            ? unreadMessageCount > 0
                              ? unreadMessageCount
                              : null
                            : null}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NotificationDropdown
                  notifications={notificationsFromApi}
                  newNotification={isThereUnreadNotifications}
                  markNotificationAsReadFunction={markNotificationsAsRead}
                  reRenderFunction={setRerender}
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {isAuthenticated && <MenteeDropDown />}
                  <div>
                    {/* <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button> */}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            // className={classNames(
                            //   active ? "bg-gray-100" : "",
                            //   "block px-4 py-2 text-sm text-gray-700"
                            // )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            // className={classNames(
                            //   active ? "bg-gray-100" : "",
                            //   "block px-4 py-2 text-sm text-gray-700"
                            // )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            // className={classNames(
                            //   active ? "bg-gray-100" : "",
                            //   "block px-4 py-2 text-sm text-gray-700"
                            // )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-x-3 px-2 pb-3 pt-2 text-white">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  //   className={classNames(
                  //     item.current
                  //       ? "bg-gray-900 text-white"
                  //       : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  //     "block rounded-md px-3 py-2 text-base font-medium"
                  //   )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavbarMentee;