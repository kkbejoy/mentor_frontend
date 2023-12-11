import React, { useState, useEffect } from "react";

const MentorPricingCardShimmer = () => {
  return (
    <div className="max-w-xs w-fit mx-auto  bg-gradient-to-r from-gray-400 to-gray-100 rounded-xl p-6 shadow-md animate-pulse">
      <div className="text-2xl font-semibold mb-3">
        <div className="w-40 h-6 bg-gray-400 rounded"></div>
      </div>

      <div className="mb-4">
        <div className="w-full h-16 bg-gray-400 rounded"></div>
      </div>

      <div className="mb-4">
        <div className="w-full h-16 bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default MentorPricingCardShimmer;
