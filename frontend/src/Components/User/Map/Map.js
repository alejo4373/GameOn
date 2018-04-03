import React, { Component } from "react";
import axios from "axios";
import "./Map.css";
import "./infoWindow.css";

import {
  Map,
  InfoWindow,
  Marker,
  GoogleApiWrapper,
  // eslint-disable-next-line
  google
} from "google-maps-react";
import {
  Tabs,
  Tab,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from "react-bootstrap";

//Bootstrap Elements ~Kelvin
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";



const Handle = Slider.Handle;

// eslint-disable-next-line
function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedEvents: {},
      hostedEvents: [],
      userCurrentLocation: "",
      allSports: [{ name: "All", id: "" }],
      miles: 5,
      sportID: ""
    };
  }

  handle = props => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
        show={value}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
  };

  getAllSports = () => {
    const { allSports } = this.state;
    axios
      .get("/sport/all")
      .then(res => {
        this.setState({
          allSports: allSports.concat(res.data.sports)
        });
      })
      .catch(err => {
        console.log("Error Retrieving Sports:", err);
      });
  };

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

  getUserCurrentLocation = (callback, miles = this.state.miles, id) => {
    var options = {
      enableHighAccuracy: true,
      timeout: 500,
      maximumAge: 0
    };

    function error(err) {
      console.log("error", err);
      callback(40.7128, -73.935242, miles, id);
      //40.6619451,-73.8946182
    }
    function showPosition(position) {
      if (position) {
        callback(
          position.coords.latitude,
          position.coords.longitude,
          miles,
          id
        );
      }
    }

    navigator.geolocation.getCurrentPosition(showPosition, error, options);
  };

  getAllHostedEvents = (latitude, longitude, miles, id) => {
    console.log(id);

    this.setState({
      miles: miles
    });

    axios
      .get(
        `/event/radius?lat=${latitude}&long=${longitude}&radius=${miles}&sport_id=${
          id !== undefined ? id : ""
        }`
      )
      .then(res => {
        console.log("HostData:", res.data);
        this.setState({
          hostedEvents: res.data.events
        });
      });
  };

  handleSportSelector = e => {
    const { miles } = this.state;

    let id = e.target.value;

    this.setState({
      sportID: id
    });
    this.getUserCurrentLocation(this.getAllHostedEvents, miles, id);
  };

  componentWillMount() {
    this.getUserCurrentLocation(this.getAllHostedEvents);
    this.getAllSports();
  }

  render() {
    const { hostedEvents, selectedEvents, allSports, miles } = this.state;
    const wrapperStyle = { width: 150, margin: 5, marginLeft: 40 };
    return (
      <div>
        <div id="google-map">
          <div id="map-filter">
            <div style={wrapperStyle}>
              Select Miles
              <span
                style={{ width: "20px", height: "10px", position: "absolute" }}
              >
                {miles}
              </span>
              <Slider
                defaultValue={miles}
                min={1}
                max={8}
                handle={this.handle}
                onChange={props =>
                  this.getUserCurrentLocation(
                    this.getAllHostedEvents,
                    props,
                    this.state.sportID
                  )
                }
              />
            </div>
            <div style={{ position: "absolute", marginLeft: 20 }}>
              Select A Sport:
            </div>
            <FormControl
              componentClass="select"
              placeholder="select"
              bsClass="formControlsSelect"
              onChange={this.handleSportSelector}
            >
              {allSports.map((s, i) => {
                return <option key={i} value={s.id}>{s.name}</option>;
              })}
            </FormControl>
          </div>
          <Map
            google={this.props.google}
            initialCenter={{
              lat: 40.7128,
              lng: -73.935242
            }}
            zoom={12}
            onClick={this.onMapClicked}
            style={{
              width: "900px",
              marginLeft: "30%",
              height: "675px",
              marginTop: "4%"
            }}
          >
            {hostedEvents.length
              ? hostedEvents.map(e => (
                  <Marker
                    title={e.name}
                    name={e.name}
                    sport={e.sport_name}
                    id={e.id}
                    location={e.location}
                    hostUsername={e.host_username}
                    description={e.description}
                    position={{ lat: e.lat, lng: e.long }}
                    onClick={this.onMarkerClick}
                    profile_pic={e.profile_pic}
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
              <a href={`/user/event/${selectedEvents.id}`}>
                <div id="individual-event-card">
                  <div class='left-side' style={{backgroundImage: `url(/images/${selectedEvents.sport}.jpg)`}}>
                  </div>
                  <div class='right-side'>
                        <img src={`/icons/${selectedEvents.sport}-icon.png`} class='icon'/>
                        <p class='event-name'>{selectedEvents.name}</p>
                        <img src='/icons/user-icon.png' class='icon'/>
                        <p>{selectedEvents.hostUsername}</p>
                        <img src='/icons/pin-icon.png' class='icon'/>
                        <p>{selectedEvents.location}</p>
                  </div>
                </div>
              </a>
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
