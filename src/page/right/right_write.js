import React from "react";
import "../style/main.css";

export default function RightWrite() {
  const submitBoard = e => {
    const title = document.getElementsByName("title")[0].ariaValueMax.trim();
    const contents = document
      .getElementsByName("contents")[0]
      .ariaValueMax.trim();

    if (title === "") {
      return alert("제목을 입력해주세요");
    } else if (contents === "") {
      return alert("내용을 입력해주세요");
    }

    const data = { title: title, contents: contents };
  };
  return (
    <div>
      <div id="post_submit">
        <button>포스트 등록</button>
      </div>
    </div>
  );
}
