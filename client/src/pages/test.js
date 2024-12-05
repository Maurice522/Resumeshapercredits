import React, { useState } from "react";
import "../styleSheet/Info.css";
import { InfoCircleFill } from "react-bootstrap-icons";

const Test = () => {
  const [displayInfo, setDisplayInfo] = useState(false);
  return (
    <>
      {displayInfo && (
        <div className='infoText' style={{ position: "absolute" }}>
          <p>I am information</p>
        </div>
      )}

      <p style={{ marginTop: "200px", marginLeft: "200px" }}>
        Hello &nbsp;&nbsp;{" "}
        <InfoCircleFill
          color='#35b276'
          size={22}
          onMouseEnter={() => setDisplayInfo(true)}
          onMouseLeave={() => setDisplayInfo(false)}
        />
      </p>
    </>
  );
};

export default Test;
