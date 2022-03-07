import React from "react";
import { useRoutes } from "react-router-dom";

import NewsEditor from "../page/news";

export default function Router() {
  return useRoutes([{ path: "/news", element: <NewsEditor /> }]);
}
