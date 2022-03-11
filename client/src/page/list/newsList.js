import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import parse from "html-react-parser";
import Axios from "axios";
import Paging from "../../component/Paging";

import "../page.css";

export default function NewsList() {
  const [viewContent, setViewContent] = useState([]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  // 글 목록 불러오기
  useEffect(() => {
    Axios.get("http://localhost:8000/news/getNewsList")
      .then(response => {
        setViewContent(response.data);
      })
      .then(response => {
        setTotal(Math.ceil(response.data.totalElements));
        setTotalPage(Math.ceil(response.data.totalPages));
      })
      .then(() => {
        if (page > total) {
          setPage(0);
        }
      });
  }, [page, total]);

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

          {viewContent.map((Element, index) => (
            <div className="list_grid list_data" key={index}>
              <div>{Element.id}</div>
              <h2>
                <Link to="/newsview">{Element.title}</Link>
              </h2>
              <div>{Element.creator_id}</div>
              <div className="acenter">{parse(Element.content)}</div>
              <div>{Element.date}</div>
            </div>
          ))}
        </div>
        <Paging
          page={page}
          total={total}
          setPage={setPage}
          totalPage={totalPage}
        />
      </div>
    </>
  );
}
