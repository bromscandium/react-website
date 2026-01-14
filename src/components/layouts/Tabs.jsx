import React from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import { TabRow } from "../rows/TabRow";
import "./styles/Tabs.css";

export const Tabs = () => {
  const [searchParams] = useSearchParams();
  const city = searchParams.get("city");

  return (
    <div className="tabs-layout">
      <TabRow city={city} />
      <Outlet />
    </div>
  );
};
