import React, { Component } from "react";


//DashBoard Components
import Overview from "./Overview";


class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-parent">
      
        {/*All Dashboard Components Goes Here (NOT INCLUDING THE LINK COMPONENTS)*/}
        <div id="dashboard_components">
          <div id="Overview_component">
            <Overview />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
