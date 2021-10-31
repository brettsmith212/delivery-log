import React from "react";
import "./LoggedIn.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Home from "../dashboardTabs/home/Home";
import Analytics from "../dashboardTabs/analytics/Analytics";
import Table from "../dashboardTabs/table/Table";
import { Switch, Route } from "react-router-dom";

function LoggedIn() {
  return (
    <div className="container">
      <Sidebar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/table" component={Table} />
      </Switch>
      <footer></footer>
    </div>
  );
}

export default LoggedIn;
