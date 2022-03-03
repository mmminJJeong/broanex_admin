import React from "react";
import { useRoutes } from "react-router-dom";

import Main from "../page/main";
import Test from "../inc/test";

export default function Router() {
  return useRoutes([
    { path: "/", element: <Main /> },
    { path: "/test", element: <Test /> },
  ]);
}
