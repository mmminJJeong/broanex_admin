import React from "react";

import "./style/main.css";
export default function Write() {
  return (
    <div className="Write">
      <div>
        <input id="title_txt" name="title" placeholder="제목" type="text" />
      </div>
      <div>
        <textarea
          id="content_txt"
          name="contents"
          placeholder="내용을 입력하세요."
        ></textarea>
      </div>
    </div>
  );
}
