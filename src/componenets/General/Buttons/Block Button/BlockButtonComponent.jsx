import React, { useEffect, useState } from "react";
import { UilExchangeAlt } from "@iconscout/react-unicons";

const BlockButtonComponent = ({
  id,
  name,
  email,
  currentStatus,
  buttonClickFunction,
  isUpdated,
}) => {
  console.log("Mentr Id", id);
  //   const [isUpdated, setIsUpdated] = useState(false);
  return (
    <div className="flex flex-col-2">
      <div>{currentStatus}</div>
      <div>
        <button onClick={() => buttonClickFunction(id, name, email)}>
          <UilExchangeAlt color="red" />
        </button>
        {isUpdated ? <div>H</div> : null}
      </div>{" "}
    </div>
  );
};

export default BlockButtonComponent;
