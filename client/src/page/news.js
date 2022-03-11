import React, { useState } from "react";

//글 작성 에디터
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "axios";

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
