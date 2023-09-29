import React, { useEffect, useState } from "react";
// import

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
    <div>
      {currentStatus}
      <button onClick={() => buttonClickFunction(id, name, email)}> Δ</button>
      {isUpdated ? <div>H</div> : null}
    </div>
  );
};

export default BlockButtonComponent;
