import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
// import parse from "html-react-parser";
import "../page.css";

function NoticePostView() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { board_id } = useParams();

  useEffect(() => {
    try {
      Axios.get("http://localhost:8000/notice/getNoticePost", {
        params: {
          board_id: board_id,
        },
      }).then((response) => {
        setData(response.data[0]);
      });
    } catch (e) {
      console.error(e.message);
    }
  }, [board_id]);

  return (
    <>
      <div className="post-view-wrapper">
        <h2 align="center">게시글 상세정보</h2>
        <div className="post-view-content">
          {data ? (
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
            </>
          ) : (
            "해당 게시글을 찾을 수 없습니다."
          )}
        </div>
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

export default NoticePostView;
