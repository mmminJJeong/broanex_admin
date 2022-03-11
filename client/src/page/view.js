import React, { useState } from "react";

// import axios from "axios";

import "./page.css";

const PostView = ({ history, location, match }) => {
  //   const [data, setData] = useState({});

  //   const { no } = match.params;

  //   const getPostByNo = no => {
  //     const array = postList.filter(x => x.no == no);
  //     if (array.length == 1) {
  //       return array[0];
  //     }
  //     return null;
  //   };

  //   useEffect(() => {
  //     setData(getPostByNo(no));
  //   }, []);

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
          onClick={() => history.goBack()}
        >
          목록으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default PostView;
