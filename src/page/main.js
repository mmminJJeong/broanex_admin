import React from "react";
import RightWrite from "./right/right_write";

import "./style/main.css";
import Write from "./write";

function Main() {
  return (
    <>
      <div className="Mains">
        <div id="Mains-left">
          <h3> Left Side </h3>
        </div>

        <div>
          <Write></Write>
        </div>

        <div id="Mains-right">
          <RightWrite />
        </div>
      </div>
    </>
  );
}

export default Main;
