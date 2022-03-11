import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

export default function SideMenu() {
  return (
    <div className="side-nav-section">
      <nav className="gnb-wrapper">
        <ul>
          <li>
            <Link to="/news" className="gnb-contents">
              News Posting
            </Link>

            <div className="ghb-sub">
              <ul>
                <li>
                  <Link to="/newslist" className="gnb-contents">
                    - News List
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/notice" className="gnb-contents">
              Notice Posting
            </Link>
            <div className="ghb-sub">
              <ul>
                <li>
                  <Link to="/noticeList" className="gnb-contents">
                    - Notice List
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}
