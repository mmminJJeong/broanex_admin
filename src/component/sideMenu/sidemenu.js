import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export default function SideMenu() {
  return (
    <div className="side-nav-section">
      <nav className="gnb-wrapper">
        <ul>
          <li>
            <Link to="/" className="gnb-contents">
              뉴스 글 관리
            </Link>
          </li>
          <li>
            <Link to="/" className="gnb-contents">
              공지사항 관리
            </Link>
          </li>
          <li>
            <Link to="/" className="gnb-contents">
              구축사례 관리
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
