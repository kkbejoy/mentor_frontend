// LoadingSkeleton.tsx
import React from "react";
import ContentLoader from "react-content-loader";

const ChatLineGraphSkeleton = () => (
  <ContentLoader
    speed={4}
    width={400}
    height={200}
    viewBox="0 0 400 200"
    backgroundColor="#6b6b6b"
    foregroundColor="#ecebeb"
    className="h-80 w-2/3 "
  >
    {/* Chat bubble */}
    <rect x="10" y="10" rx="5" ry="5" width="380" height="80" />

    {/* Line graph */}
    <rect x="10" y="100" rx="5" ry="5" width="380" height="80" />
  </ContentLoader>
);

export default ChatLineGraphSkeleton;
