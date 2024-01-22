import React, { useEffect } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { checkAuthentication } from "../../utilities/reusableFunctions";
import LogoComponent from "../General/Logo/LogoComponent";
import { logoThumbnail } from "../../constants/endpoints";
import MentorDropDown from "./OptionsDropdown/MentorDropDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTheNumberOfUnreadMesagesMentorSide } from "../../slices/MentorSlices/unreadConversation";
const NavbarMentor = () => {
  const dispatch = useDispatch();
  const navigation = [
    { name: "Home", href: "/mentors" },
    // { name: "Profile", href: "/mentors/profile" },
    { name: "Scheduler", href: "/mentors/scheduler" },
    // { name: "Mentees", href: "/mentors/subscribed-mentees" },
    { name: "Connect", href: "/mentors/connect/inbox/", notify: true },
    { name: "Raise a ticket", href: "/mentors/tickets" },
    // { name: "Mentors List", href: "#", current: false },
  ];
  const isAuthenticated = checkAuthentication();

  useEffect(() => {
    dispatch(fetchTheNumberOfUnreadMesagesMentorSide());
  }, []);

  const unreadConversationLength = useSelector(
    (state) => state?.mentorSideUnreaMessageCount?.unreadCount
  );

  return (
    <Disclosure
      as="nav"
      className=" bg-mentorBlue sticky top-0 z-10 w-full  shadow-stone-500/40"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {" "}
              <Link to={"/mentors"}>
                {" "}
                <img
                  className="hidden sm:block h-14 w-14 rounded-full shadow-lg transition-transform hover:animate-none p-2"
                  src={logoThumbnail}
                  alt=""
                />
              </Link>{" "}
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
                {/* <LogoComponent /> */}
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-14 text-white">
                    {navigation.map((item) => (
                      <Link
                        to={item.href}
                        key={item.name}
                        href={item.href}
                        className={
                          (item.current
                            ? "bg-gray-900 text-white hover:text-red-400"
                            : "text-gray-300 hover:bg-gray-700 hover:text-gray-100",
                          "rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800")
                        }
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                        {item.notify ? (
                          <span className="text-red-400 ml-3 text-sm">
                            {unreadConversationLength > 0
                              ? unreadConversationLength
                              : null}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button> */}

                {isAuthenticated && <MentorDropDown />}
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
                  className={
                    (item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium")
                  }
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

export default NavbarMentor;
