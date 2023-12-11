import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  getMenteeIdFromLocalStorage,
  getMentorIdFromLocalStorage,
} from "../../../utilities/reusableFunctions";
import LogoutComponent from "../Logout Component/LogoutComponent";
import { Link } from "react-router-dom";
import {
  getMenteeNameFromLocalStorage,
  getMentorNameFromLocalStorage,
} from "../../../utilities/localStorageUtilities";

export default function MentorDropDown() {
  const links = [
    { href: "/mentors/profile", label: "Profile" },
    { href: "/mentors/subscribed-mentees", label: "Mentees List" },
    { href: "/mentors/tickets", label: "Tickets" },
    // { href: "/sign-out", label: "Sign out" },
  ];
  // const { mentorId } = getMentorIdFromLocalStorage();
  const mentorName = getMentorNameFromLocalStorage();
  return (
    <div className=" top-16 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <img
              className="rounded-t-lg h-8 w-8 mr-3"
              src="https://res.cloudinary.com/dlcsyyk7z/image/upload/v1698830239/mentors/mentor/images_2_d4e6fp_siwirt_a7fcrt.jpg"
              alt=""
            />{" "}
            {mentorName}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {links.map((link) => {
                return (
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={link.href}>
                        {" "}
                        <button
                          className={`${
                            active ? "bg-slate-400 text-white" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {/* {active ? (
                  <EditActiveIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                ) : (
                  <EditInactiveIcon
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                )} */}
                          {link.label}
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                );
              })}
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={`${
                      active ? "bg-slate-400 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogoutComponent />
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
