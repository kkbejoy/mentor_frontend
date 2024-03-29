import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { routesFrontend } from "../../../constants/frontendRoutes";
import { Link } from "react-router-dom";
import { logoThumbnail } from "../../../constants/endpoints";
const navigation = [
  {
    name: "Become a Mentor",
    href: routesFrontend.MentorRegister,
    // current: true,
  },
  {
    name: "Find a Mentor",
    href: routesFrontend.MentorBrowsePage,
    current: false,
  },
  // { name: "Login", href: routesFrontend.LogIN, current: false },
  // { name: "Calendar", href: "#", current: false },
];

export default function NavbarHome() {
  return (
    // <nav className="  sticky  top-0 z-10 w-full bg-white shadow dark:bg-neutral-800">
    <Disclosure
      as="nav"
      className=" shadow-lg  shadow-stone-500/40 sticky top-0 z-10 w-full flex h-[58px] item-center justify-between bg-mentorBlue "
    >
      {({ open }) => (
        <>
          <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <Link to={"/"}>
                {" "}
                <img
                  className="h-14 w-14 rounded-full shadow-lg  transition-transform hover:animate-none p-2 "
                  src={logoThumbnail}
                  alt=""
                />
              </Link>
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                {/* <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button> */}
              </div>
              <div className="flex flex-1  justify-end sm:items-stretch sm:justify-start">
                {/* <div className="flex flex-shrink-0 items-center"> */}
                {/* <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  /> */}
                {/* </div> */}
                {/* <div className="hidden sm:ml-6 sm:block"> */}
                <div className="mx-auto flex flex-1 sm:space-x-6  text-white ">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={
                        (item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium")
                      }
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                {/* </div> */}
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}

                <Menu as="div" className="relative ml-3">
                  <div className="text-centre text-white ml-3 ">
                    {/* {isAuthenticated ? (
                      "Logout"
                    ) : ( */}
                    <Link to={"/auth/login"}>
                      <p className="font-normal">Login</p>
                    </Link>
                    {/* )} */}
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>

                      {/* <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      /> */}
                    </Menu.Button>
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
                            {/* Your Profile */}
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
                            {/* Settings */}
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
                            {/* Sign out */}
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
            <div className="space-y-1 px-2 pb-3 pt-2 text-white">
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
    // </nav>
  );
}
