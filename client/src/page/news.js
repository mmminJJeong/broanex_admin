import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//글 작성 에디터
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import Axios from "axios";
import Paging from "../component/Paging";

//css
import "./page.css";

// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";

// const editorConfiguration = {
//   plugins: [Paragraph, Bold, Italic, Essentials],
//   toolbar: ["bold", "italic"],
// };
//안됨 ...왜안되는데 ........ 왜......?

export default function NewsEditor() {
  const [newscontent, setNewsContent] = useState({
    title: "",
    content: "",
  });

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

  //글 작성 업로드
  const submitNews = () => {
    Axios.post("http://localhost:8000/news/saveNews", {
      title: newscontent.title,
      content: newscontent.content,
    }).then(response => {
      console.log(response);
      alert("등록 완료!");
    });
  };

  const getValue = e => {
    const { name, value } = e.target;
    setNewsContent({
      ...newscontent,
      [name]: value,
    });
    console.log(newscontent);
  };

  return (
    <div className="main-wrapper">
      <div className="news-title">
        <h2>게시물</h2>
      </div>

      {/*  글 목록 */}
      <div className="List">
        <div className="list_grid list_tit">
          <div> 제목 </div>
          <div> 내용 </div>
        </div>

        {viewContent.map((Element, index) => (
          <div className="list_grid list_data" key={index}>
            <h2>
              <Link to="/view">{Element.title}</Link>
            </h2>

            <div className="acenter">{parse(Element.content)}</div>
          </div>
        ))}
      </div>
      <Paging
        page={page}
        total={total}
        setPage={setPage}
        totalPage={totalPage}
      />

      {/* 글작성 */}
      <div className="news-title">
        <h2>뉴스 게시글 작성</h2>
      </div>
      <div className="editor-inside">
        <input
          className="input-title"
          type="text"
          placeholder="제목을 입력해주세요."
          onChange={getValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          data="<p>내용을 입력해주세요.</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!");
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setNewsContent({
              ...newscontent,
              content: data,
            });
            console.log(newscontent);
          }}
          // config={editorConfiguration}
        />
        <button className="submit-button" onClick={submitNews}>
          입력
        </button>
      </div>
    </div>
  );
}
