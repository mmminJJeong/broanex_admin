import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import "./page.css";
import Axios from "axios";

export default function NoticeEditor() {
  const [noticeContent, setNoticeContent] = useState({
    title: "",
    content: "",
  });

  const [viewMoreContent, setViewMoreContent] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/notice/getNoticeList").then(respones => {
      setViewMoreContent(respones.data);
    });
  });

  const submitNotice = () => {
    Axios.post("http://localhost:8000/notice/saveNotice", {
      title: noticeContent.title,
      content: noticeContent.content,
    }).then(response => {
      console.log(response);
      alert("등록 완료!");
    });
  };

  const getValue = e => {
    const { name, value } = e.target;
    setNoticeContent({
      ...noticeContent,
      [name]: value,
    });
    console.log(noticeContent);
  };

  return (
    <div className="main-wrapper">
      <div className="news-title">
        <h2>게시물</h2>
      </div>
      <div className="news-container">
        {viewMoreContent.map((Element, noticeIndex) => (
          <div key={noticeIndex}>
            <h2>{Element.title}</h2>
            <div>{parse(Element.content)}</div>
          </div>
        ))}
      </div>
      <div className="news-title">
        <h2>공지사항 작성</h2>
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
            setNoticeContent({
              ...noticeContent,
              content: data,
            });
            console.log(noticeContent);
          }}
        />

        <button className="submit-button" onClick={submitNotice}>
          입력
        </button>
      </div>
    </div>
  );
}
