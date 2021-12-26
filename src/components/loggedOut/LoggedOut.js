import React from "react";
import "./LoggedOut.css";

function LoggedOut() {
  return (
    <div>
      <main className="main">
        <div className="hero">
          <h1>Welcome to Delivery Log</h1>
          <h2>Track your earnings in a simple and modern dashboard</h2>
          <a href="#features">Learn More</a>
        </div>
        <div id="features">
          <div className="showcase">
            <h2>An easier way to monitor and calculate your earnings</h2>
            <video autoPlay loop controls>
              <source
                src={require("../images/tutorial.mov")}
                type="video/mp4"
              />
            </video>
            <h2>Simple summary of total earnings</h2>
            <img src={require("../images/home.png")} alt="home screenshot" />
            <h2>Visualize earning trends with analytics</h2>
            <img
              src={require("../images/analytics.png")}
              alt="analytics screenshot"
            />
            <h2>Organize your data in an easy to read table</h2>
            <img src={require("../images/table.png")} alt="table screenshot" />
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default LoggedOut;
