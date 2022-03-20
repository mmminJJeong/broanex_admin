import React from "react";
import { useRoutes } from "react-router-dom";

import NoticeEditor from "../page/notice";
import NewsEditor from "../page/news";
import NewsPostView from "../page/view/newsView";
import NoticePostView from "../page/view/noticeView";
import NewsList from "../page/list/newsList";
import NoticeList from "../page/list/noticeList";
// import Login from "../page/login";

export default function Router() {
  return useRoutes([
    { path: "/news", element: <NewsEditor /> },
    { path: "/notice", element: <NoticeEditor /> },
    { path: "/newsview", element: <NewsPostView /> },
    { path: "/newsview/:board_id", element: <NewsPostView /> },
    { path: "/noticeview", element: <NoticePostView /> },
    { path: "/noticeview/:board_id", element: <NoticePostView /> },
    { path: "/newsList", element: <NewsList /> },
    { path: "/noticeList", element: <NoticeList /> },
    // { path: "/Login", element: <Login /> },
  ]);
}
