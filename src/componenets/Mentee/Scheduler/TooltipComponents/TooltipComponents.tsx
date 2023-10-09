import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
}
const TooltipComponents: FC<Props> = ({ children, tooltip }) => {
  return (
    <div className="group relative inline-block">
      {children}(
      <span className=" invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-blue-500 text-white p-1 rounded absolute top-full mt-2 whitespace-nowrap">
        {tooltip}
      </span>
      )
    </div>
  );
};

export default TooltipComponents;
