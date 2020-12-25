import * as React from "react";
import Index from "./views/editor/";

export const router = [
  {
    path: "/",
    main: () => <Index />,
  },
  {
    path: "/login",
    main: () => <h1>login</h1>,
  },
];
