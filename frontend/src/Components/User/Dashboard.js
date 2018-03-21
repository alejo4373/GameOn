import React, { Component } from "react";

//DashBoard Components
import Profile from "./Profile/Profile";
import Upcoming from "./Profile/Upcoming";
import History from "./Profile/History";
class Dashboard extends Component {
  render() {
    return (
      <div className="parent">
        {/*Navigation Bar*/}

        {/*All Dashboard Components Goes Here (NOT INCLUDING THE LINK COMPONENTS)*/}
        <div id='dashboard_components'>
          <div id="profile_component">
            <Profile />
          </div>

          <div id="upcoming_component">
            <h2 className="event_title">UPCOMING EVENTS</h2>
            <Upcoming />
          </div>

          <div id="history_component">
            <h2 className="event_title">PAST EVENTS</h2>
            <History />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
