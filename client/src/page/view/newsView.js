import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// import axios from "axios";

import "../page.css";

function NewsPostView() {
  const navigate = useNavigate(); // 뒤로가기 v6라서 usehistory =>navigate
  const [ data, setData ] = useState({});

  useEffect(() => {
    Axios.get("http://localhost:8000/news/getNewsPost")
      .then(response => {
        setData(response.data);
      })
  }, []);

  return (
    <>
      <div className="post-view-wrapper">
        <h2 align="center">게시글 상세정보</h2>

        <>
          <div className="post-view-row">
            <label>게시글 번호</label>
            <label>{data.board_id}</label>
          </div>
          <div className="post-view-row">
            <label>제목</label>
            <label>{data.title}</label>
          </div>
          <div className="post-view-row">
            <label>내용</label>
            <div>{data.content}</div>
          </div>
          <div className="post-view-row">
            <label>이미지</label>
            <div>{data.image}</div>
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
