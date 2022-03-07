import React from "react";
import { Link } from "react-router-dom";
import "./layout.css";

export default function MainHeader() {
  return (
    <header className="header">
      <div className="wrapper-1">
        <h1>
          <Link to="/home" className="logo">
            브로넥스 관리자 페이지
          </Link>
        </h1>
      </div>
    </header>
  );
}
