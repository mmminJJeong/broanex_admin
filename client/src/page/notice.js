import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";

import "./page.css";
const UPLOAD_ENDPOINT = "upload_img_files";

export default function NoticeEditor() {
  const [noticeContent, setNoticeContent] = useState({
    title: "",
    content: "",
    image: "",
  });

  //현재날짜
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const nowDate = year + "-" + month + "-" + day;

  //글 등록
  const submitNotice = () => {
    Axios.post("http://localhost:8000/notice/saveNotice", {
      title: noticeContent.title,
      content: noticeContent.content,
      date: nowDate,
      creator_id: null,
      image: null,
    }).then((response) => {
      console.log(response);
      alert("등록 완료!");
      // return window.location.replace("/");
    });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setNoticeContent({
      ...noticeContent,
      [name]: value,
    });
    console.log(noticeContent);
  };

  //이미지 저장
  const custom_config = {
    extraPlugins: [uploadPlugin],
  };

  function MyUploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("file", file);
            fetch(
              `http://localhost:8000/${UPLOAD_ENDPOINT}/${UPLOAD_ENDPOINT}`,
              {
                method: "post",
                body: body,
              }
            )
              .then((res) => res.json())
              .then((res) => {
                resolve({
                  default: `${"http://localhost:8000"}/${res.filename}`, //업로드 된 파일 주소
                });
              })
              .catch((err) => {
                reject(err);
              });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return MyUploadAdapter(loader);
    };
  }
  return (
    <div className="main-wrapper">
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
          config={custom_config}
          editor={ClassicEditor}
          data="<p>내용을 입력해주세요.</p>"
          onReady={(editor) => {
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
        <form method="post" encType="multipart/form-data">
          <input type="file" name="image" />
        </form>
        <button className="submit-button" onClick={submitNotice}>
          입력
        </button>
      </div>
    </div>
  );
}
