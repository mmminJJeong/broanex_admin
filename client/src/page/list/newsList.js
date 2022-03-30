import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// import parse from "html-react-parser";
import Axios from "axios";

import "../page.css";

export default function NewsList() {
    const [viewContent, setViewContent] = useState([]);

    // 글 목록 불러오기
    useEffect(() => {
        Axios.get("http://211.214.247.21:8000/news/getNewsList").then(response => {
            setViewContent(response.data);
        });
    }, []);

    return (
        <>
            <div className='main-wrapper'>
                {/*  글 목록 */}
                <div className='List'>
                    <div className='list_grid list_tit'>
                        <div> 글 번호 </div>
                        <div> 제목 </div>
                        <div>작성자</div>
                        <div>작성 날짜</div>
                    </div>

                    {viewContent.map((Element, index) => (
                        <div className='list_grid list_data' key={index}>
                            <div>{Element.board_id}</div>
                            <h2>
                                <Link to={`/newsview/${Element.board_id}`}>{Element.title}</Link>
                            </h2>
                            <div>{Element.creator_id}</div>

                            <div>{Element.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
