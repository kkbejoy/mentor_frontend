import React from "react";
import { Link } from "react-router-dom";

const SubscribedMentorsCardComponent = () => {
  return (
    <div className="flex items-center justify-center min-h-screen container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Card Components */}
        <div className="card">
          <div className="p-5 flex flex-col">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dlcsyyk7z/image/upload/v1688789087/ggijlm6o82x8kaqyhuew.jpg"
                alt=""
              />
            </div>
            <h5 className="text-2xl md:text-3xl font-medium mt-3">Title</h5>
            <p className="text-slate-500  text-lg mt-3"> Helloooo</p>
            <Link to={"/home"}>GO Home</Link>
          </div>
        </div>
        <div className="card">
          <div className="p-5 flex flex-col">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dlcsyyk7z/image/upload/v1688789087/ggijlm6o82x8kaqyhuew.jpg"
                alt=""
              />
            </div>
            <h5 className="text-2xl md:text-3xl font-medium mt-3">Title</h5>
            <p className="text-slate-500  text-lg mt-3"> Helloooo</p>
            <Link to={"/home"}>GO Home</Link>
          </div>
        </div>
        <div className="card">
          <div className="p-5 flex flex-col">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dlcsyyk7z/image/upload/v1688789087/ggijlm6o82x8kaqyhuew.jpg"
                alt=""
              />
            </div>
            <h5 className="text-2xl md:text-3xl font-medium mt-3">Title</h5>
            <p className="text-slate-500  text-lg mt-3"> Helloooo</p>
            <Link to={"/home"}>GO Home</Link>
          </div>
        </div>
        <div className="card">
          <div className="p-5 flex flex-col">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/dlcsyyk7z/image/upload/v1688789087/ggijlm6o82x8kaqyhuew.jpg"
                alt=""
              />
            </div>
            <h5 className="text-2xl md:text-3xl font-medium mt-3">Title</h5>
            <p className="text-slate-500  text-lg mt-3"> Helloooo</p>
            <Link to={"/home"}>GO Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribedMentorsCardComponent;
