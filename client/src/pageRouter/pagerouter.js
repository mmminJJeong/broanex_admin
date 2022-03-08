import React from "react";
import { useRoutes } from "react-router-dom";

import NoticeEditor from "../page/notice";
import NewsEditor from "../page/news";

export default function Router() {
  return useRoutes([
    { path: "/news", element: <NewsEditor /> },
    { path: "/notice", element: <NoticeEditor /> },
  ]);
}
