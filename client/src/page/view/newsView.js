import React from "react";
import { useNavigate } from "react-router-dom";

// import axios from "axios";

import "../page.css";

function NewsPostView() {
  const navigate = useNavigate(); // 뒤로가기 v6라서 usehistory =>navigate

  return (
    <>
      <div className="post-view-wrapper">
        <h2 align="center">게시글 상세정보</h2>

        <>
          <div className="post-view-row">
            <label>게시글 번호</label>
            <label></label>
          </div>
          <div className="post-view-row">
            <label>제목</label>
            <label></label>
          </div>
          <div className="post-view-row">
            <label>내용</label>
            <div></div>
          </div>
        </>
        <button
          className="post-view-go-list-btn"
          onClick={() => {
            navigate(-1);
          }}
        >
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
}

export default NewsPostView;
