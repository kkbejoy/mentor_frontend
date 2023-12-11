import React from "react";

const MentorHeaderShimmer = () => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-1/2 h-1/2 bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer rounded-3xl">
        {/* Content here */}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
        aspernatur ducimus. Expedita possimus dolore dolores repellendus,
        consequatur cupiditate nisi, voluptate quas magnam praesentium ullam
        nostrum deleniti iusto vitae, nulla ab.
      </div>
      <div className="ml-4">
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-3/4 mb-2"></div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-1/2"></div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-3/4"></div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-3/4"></div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-1/2"></div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-3/4"></div>
        <div className="bg-gradient-to-r from-gray-300 to-gray-100 animate-shimmer shimmer-line w-1/2"></div>
      </div>
    </div>
  );
};

export default MentorHeaderShimmer;
