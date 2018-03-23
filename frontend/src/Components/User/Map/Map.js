import React, { Component } from "react";
import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  google
} from "google-maps-react";

import { Redirect } from "react-router";
import Profile from "../Profile/Profile";

// export class MapContainer extends Component {
//   constructor() {
//     super();
//     this.state = {
//       hostedEvents: [{
//           id: 1,
//           host: "Kelvin",
//           sport: "Basketball",
//           longitude: -73.948959,
//           latitude: 40.746492,
//       }]
//     };
//   }

// //   onMapClicked = id => {
// //     this.setState({
// //       selected: true,
// //       buildingid: id
// //     });
// //   };

//   render() {
//     // const { selected, buildingid } = this.state;

//     // if (selected) {
//     //   return <Redirect to={`/building/${buildingid}`} />;
//     //   this.setState({
//     //     selected: false
//     //   });
//     // }

//     var triangleCoords = [
//         {lat: 25.774, lng: -80.190},
//         {lat: 18.466, lng: -66.118},
//         {lat: 32.321, lng: -64.757},
//         {lat: 25.774, lng: -80.190}
//       ];

//     const { hostedEvents } = this.state;
//     return (
//       <div id="map">
//         <Map
//           google={this.props.google}
//           initialCenter={{
//             lat: 40.7128,
//             lng: -73.935242
//           }}
//           zoom={9}
//         >
//           {hostedEvents.map(e => (
//             <Marker
//               title={e.host }
//               name={e.id}
//               position={{ lat: e.latitude, lng: e.longitude }}
//             //   onClick={() => this.onMapClicked(building.buildingid)}
//             />
//           ))}
//         </Map>
//       </div>
//     );
//   }
// }
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      hostedEvents: [
        {
          id: 1,
          host: "Kelvin",
          sport: "Basketball",
          longitude: -73.948959,
          latitude: 40.746492
        },
        {
          id: 2,
          host: "Joseph",
          sport: "Soccer",
          longitude: -73.8946182,
          latitude: 40.6619451
        },
        {
            id: 2,
            host: "Joseph",
            sport: "Handball",
            longitude: -73.8246182,
            latitude: 40.6119451
          },
          {
            id: 2,
            host: "Joseph",
            sport: "Basketball",
            longitude: -73.9946182,
            latitude: 40.7619451
          },
          {
            id: 2,
            host: "Joseph",
            sport: "PingPong",
            longitude: -73.846182,
            latitude: 40.6619451
          },
          {
            id: 2,
            host: "Joseph",
            sport: "Football",
            longitude: -73.8946182,
            latitude: 40.61451
          },
          {
            id: 2,
            host: "Joseph",
            sport: "Baseball",
            longitude: -73.946182,
            latitude: 40.6619451
          },
          {
            id: 2,
            host: "Volleyball",
            sport: "Soccer",
            longitude: -73.8946182,
            latitude: 40.661951
          }
      ]
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
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

  render() {
    const { hostedEvents } = this.state;
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 40.7128,
          lng: -73.935242
        }}
        zoom={11}
        onClick={this.onMapClicked}
      >
        {hostedEvents.map(e => (
          <Marker
            title={e.host}
            name={e.host}
            sport={e.sport}
            position={{ lat: e.latitude, lng: e.longitude }}
            onClick={this.onMarkerClick}
            icon={{
              url:
                "/images/basketball-marker.png",
            }}
          />
        ))}

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
              <div id="profile_username">{this.state.selectedPlace.sport}</div>
              <div>Description: Bring Snacks</div>
              <button>GameOn!</button>
              <button>More Info</button>
            </div>
          </div>
        </InfoWindow>
      </Map>
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
