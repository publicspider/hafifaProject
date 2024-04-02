import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";
import Sidebar from "./SideBar";
import React from "react";
export default function RootLayout() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
