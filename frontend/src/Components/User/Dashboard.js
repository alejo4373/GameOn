import React, { Component } from "react";
import Profile from "./Profile";
class Dashboard extends Component {
  render() {
    return (
      <div className="parent">
        <div id='profile_component'>
          <Profile />
        </div>

        <div id='upcoming_component'>
        
        </div>

        <div id='history_component'>

        </div>
      </div>
    );
  }
}

export default Dashboard;
