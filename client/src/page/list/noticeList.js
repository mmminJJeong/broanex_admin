import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import parse from "html-react-parser";
import Axios from "axios";

import "../page.css";

export default function NoticeList() {
  const [viewMoreContent, setViewMoreContent] = useState([]);

  //글 목록 리스트
  useEffect(() => {
    Axios.get("http://localhost:8000/notice/getNoticeList").then((respones) => {
      setViewMoreContent(respones.data);
    });
  }, []);

  return (
    <>
      <div className="main-wrapper">
        {/*  글 목록 */}
        <div className="List">
          <div className="list_grid list_tit">
            <div> 글 번호 </div>
            <div> 제목 </div>
            <div>작성자</div>
            <div> 내용 </div>
            <div>작성 날짜</div>
          </div>

          {viewMoreContent.map((Element, index) => (
            <div className="list_grid list_data" key={index}>
              <div>{Element.board_id}</div>
              <h2>
                <Link to={`/noticeview/${Element.board_id}`}>
                  {Element.title}
                </Link>
              </h2>
              <div>{Element.creator_id}</div>
              <div className="acenter">{parse(Element.content)}</div>
              <div>{Element.date}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
