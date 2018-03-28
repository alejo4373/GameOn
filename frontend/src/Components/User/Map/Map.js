import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  google
} from "google-maps-react";
import axios from "axios";
import { Redirect } from "react-router";

import Profile from "../Profile/Profile";
import Upcoming from "./Upcoming";

var userPosition = [];

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedEvents: {},
      hostedEvents: [],
      userCurrentLocation: "",
      allSports: []
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedEvents: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  getUserCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      if (position) {
        console.log(position);
        userPosition.longitude = position.coords.longitude;
        userPosition.latitude = position.coords.latitude;
      }
    }
  };

  getAllHostedEvents = userPosition => {
    if (userPosition.latitude) {
      axios
        .get(
          `/event/radius?lat=${userPosition.latitude}&long=${
            userPosition.longitude
          }&radius=${10}`
        )
        .then(res => {
          console.log("HostData:", res.data);
          this.setState({
            hostedEvents: res.data.events
          });
        });
    }
  };

  componentWillMount() {
    this.getUserCurrentLocation();
    setTimeout(() => {
      this.getAllHostedEvents(userPosition);
    }, 3500);
  }

  render() {
    const { hostedEvents, selectedEvents, allSports } = this.state;

    return (
      <div>
       
            <Upcoming events={hostedEvents} />
         
        <div id="google-map">
          <Map
            google={this.props.google}
            initialCenter={{
              lat: userPosition.latitude ? userPosition.latitude : 40.7128,
              lng: userPosition.longitude ? userPosition.longitude : -73.935242
            }}
            zoom={12}
            onClick={this.onMapClicked}
            style={{width: '900px', marginLeft: "30%",}}
          >
            {hostedEvents.length
              ? hostedEvents.map(e => (
                  <Marker
                    title={e.name}
                    name={e.name}
                    sport={e.sport_name}
                    location={e.location}
                    description={e.description}
                    position={{ lat: e.lat, lng: e.long }}
                    onClick={this.onMarkerClick}
                    icon={{
                      url: `/images/${e.sport_name}-marker.png`
                    }}
                  />
                ))
              : ""}

            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
            >
              <div style={{ width: "300px", height: "150px" }}>
                <div
                  id="marker-event-header"
                  style={{ width: "300px", height: "150px" }}
                >
                  <img src={"/images/user.png"} id="marker-event-photo" />
                  <span id="marker-event-username">{selectedEvents.name}</span>
                  <div id="marker-event-sport-name">
                    {selectedEvents.sport
                      ? selectedEvents.sport.toUpperCase()
                      : ""}
                  </div>
                  <div>Address: {selectedEvents.location}</div>
                  <div>Description: {selectedEvents.description}</div>
                  <button>GameOn!</button>
                  <button>More Info</button>
                </div>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE"
})(MapContainer);

/**
 * Google API For Search
 * https://maps.googleapis.com/maps/api/place/autocomplete/json?input={searchInput}&location={usersLocations}&radius=100&key=AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE
 */

/**
 * Google API To Give Detailed Information About The Search Value
 * https://maps.googleapis.com/maps/api/place/details/json?placeid={searchValue}&key=AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE
 */

/**
   * Google API to Search By Query
   * https://maps.googleapis.com/maps/api/place/queryautocomplete/json?key=YOUR_API_KEY&input=pizza+near%20par

*/

/**
 * Google API To Convert Coordinates into Addresses
 * https://maps.googleapis.com/maps/api/geocode/json?latlng=40.6619239,-73.9624696&key=AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE
 */

/**
 * Google API To Convert Addresses into Coordinates
 * https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
 */


