import React from "react";
import { namesTitlesAndContents } from "../../../constants/messageToFront";
import { UilInstagram } from "@iconscout/react-unicons";
import { UilFacebookF } from "@iconscout/react-unicons";
import { UilLinkedin } from "@iconscout/react-unicons";
import { UilTwitter } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
const FooterComponent = () => {
  return (
    <footer className="bg-mentorBlue text-white py-10 b border-spacing-3 mt-5 ">
      <div className="container flex justify-between mx-auto px-4 ">
        <div className="w-2/5 ">
          <div className="my-2">
            <h1 className="text-left font-semibold">
              {namesTitlesAndContents.Name}
            </h1>
          </div>
          <div className="my-2">
            <h2 className="text-left font-thin text-xs">
              Your trusted source to find highly-vetted mentors & industry
              professionals to move your career ahead.
            </h2>
          </div>
          <div className="my-2 flex gap-2">
            <Link to={"/"}>
              <UilInstagram color="#E1306C" />
            </Link>
            <Link to={"/"}>
              <UilFacebookF color="blue" />
            </Link>
            <Link to={"/"}>
              <UilLinkedin color="#0072b1" />
            </Link>

            <Link to={"/"}>
              <UilTwitter color="#26a7de" />
            </Link>
          </div>
        </div>
        <div className="w-1/5 mx-10 ">
          <div className="my-2">
            <h1 className="text-left font-semibold">Platform</h1>
          </div>
          <div className="my-2">
            <h2 className="text-left font-thin text-xs ">Find a Mentor</h2>
          </div>
          <div className="my-2">
            <h2 className="text-left font-thin text-xs ">Book a Session</h2>
          </div>
          <div className="my-2">
            <h2 className="text-left font-thin  text-xs">Testimonials</h2>
          </div>
        </div>

        <div className="w-1/5 ">
          <div className="my-2">
            <h1 className="text-left font-semibold ">Company </h1>
          </div>

          <div className="my-2">
            <h2 className="text-left font-thin text-xs ">About </h2>
          </div>
          <div className="my-2">
            <h2 className="text-left font-thin text-xs">Code of Conduct </h2>
          </div>
        </div>
        <div className="w-1/5 ">
          <div className="my-2">
            <h1 className="text-left font-semibold">Support </h1>
          </div>

          <div className="my-2">
            <h2 className="text-left font-thin text-xs ">Faq </h2>
          </div>
          <div className="my-2">
            <h2 className="text-left font-thin text-xs ">Contact</h2>
          </div>
        </div>
      </div>
      <div className=" text-center font-thin mt-6 text-xs ">
        © 2023 Mentor.com. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
