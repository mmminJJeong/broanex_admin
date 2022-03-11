import React from "react";
import { useRoutes } from "react-router-dom";

import NoticeEditor from "../page/notice";
import NewsEditor from "../page/news";
import NewsPostView from "../page/view/newsView";
import NoticePostView from "../page/view/noticeView";
import NewsList from "../page/list/newsList";
import NoticeList from "../page/list/noticeList";

export default function Router() {
  return useRoutes([
    { path: "/news", element: <NewsEditor /> },
    { path: "/notice", element: <NoticeEditor /> },
    { path: "/newsview", element: <NewsPostView /> },
    { path: "/noticeview", element: <NoticePostView /> },
    { path: "/newsList", element: <NewsList /> },
    { path: "/noticeList", element: <NoticeList /> },
  ]);
}
