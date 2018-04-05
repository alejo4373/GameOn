import React, { Component } from "react";
import "./Dashboard.css"

//DashBoard Components
import Overview from "./Overview";


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-parent">
        {/*All Dashboard Components Goes Here (NOT INCLUDING THE LINK COMPONENTS)*/}
            <Overview />
      </div>
    );
  }
}

export default Dashboard;
