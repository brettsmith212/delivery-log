import React, { useState } from "react";
import "./Sidebar.css";
import LineStyle from "@mui/icons-material/LineStyle";
import Timeline from "@mui/icons-material/Timeline";
import TableChartIcon from "@mui/icons-material/TableChart";
import { Link } from "react-router-dom";

function Sidebar() {
  const [dashboardTab, setDashboardTab] = useState("home");

  const homeHandler = () => {
    setDashboardTab("home");
  };
  const analyticsHandler = () => {
    setDashboardTab("analytics");
  };
  const tableHandler = () => {
    setDashboardTab("table");
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={
                  dashboardTab === "home"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={homeHandler}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
            <Link to="/analytics" className="link">
              <li
                className={
                  dashboardTab === "analytics"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={analyticsHandler}
              >
                <Timeline className="sidebarIcon" />
                Analytics
              </li>
            </Link>
            <Link to="/table" className="link">
              <li
                className={
                  dashboardTab === "table"
                    ? "sidebarListItem active"
                    : "sidebarListItem"
                }
                onClick={tableHandler}
              >
                <TableChartIcon className="sidebarIcon" />
                Table
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
