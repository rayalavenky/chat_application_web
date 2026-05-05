import React from "react";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader__core"></div>

        {/* Orbit 1 (White Dot) */}
        <div className="orbit orbit--white">
          <div className="dot dot--white"></div>
        </div>

        {/* Orbit 2 (Purple Dot) */}
        <div className="orbit orbit--purple">
          <div className="dot dot--purple"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;