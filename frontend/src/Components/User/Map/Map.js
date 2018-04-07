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
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  DropdownButton,
  MenuItem
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
      userCurrentLocation: { latitude: 40.731643, longitude: -74.008397 },
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

  getUserCurrentLocation = () => {
   
    const success = position => {
      this.setState(
        {
          userCurrentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        },
        this.getAllHostedEvents
      );
    };

    navigator.geolocation.getCurrentPosition(success);
  };

  getAllHostedEvents = () => {
    const { userCurrentLocation, miles, sportID } = this.state;

    axios
      .get(
        `/event/radius?lat=${userCurrentLocation.latitude}&long=${
          userCurrentLocation.longitude
        }&radius=${miles}&sport_id=${sportID}`
      )
      .then(res => {
        console.log("HostData:", res.data);
        this.setState({
          hostedEvents: res.data.events
        });
      });
  };

  handleMilesSlider = props => {
    this.setState(
      {
        miles: props
      },
      this.getAllHostedEvents
    );
  };

  handleSportSelector = e => {
    let id = e.target.value;
    this.setState(
      {
        sportID: id
      },
      this.getAllHostedEvents
    );
  };

  componentWillMount() {
    this.getUserCurrentLocation();
    this.getAllHostedEvents();
    this.getAllSports();
  }

  render() {
    const {
      hostedEvents,
      selectedEvents,
      allSports,
      miles,
      userCurrentLocation
    } = this.state;

    console.log("User Location:", userCurrentLocation);

  
    const mapStyle = { height: "100%" };
    return (
        <div id="google-map">
          <DropdownButton bsStyle={"Info"} title={"Fiter"} id={"filter-button"}>
            <MenuItem eventKey="1"
            disabled={'true'}
            >
              <div id="map-filter">
                <div id='slider-filter' >
                  Select Miles <span> {miles} </span>

                  <Slider
                    defaultValue={miles}
                    min={1}
                    max={8}
                    handle={this.handle}
                    onChange={props => this.handleMilesSlider(props)}
                  />
                </div>
                
                <label>Select A Sport:</label>  
                
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  bsClass="formControlsSelect"
                  onChange={this.handleSportSelector}
                  
                >
                  {allSports.map((s, i) => {
                    return (
                      <option key={i} value={s.id}>
                        {s.name}
                      </option>
                    );
                  })}
                </FormControl>
              </div>
            </MenuItem>
          </DropdownButton>
          <Map
            google={this.props.google}
            initialCenter={{
              lat: 40.7128,
              lng: -73.935242
            }}
            zoom={12}
            onClick={this.onMapClicked}
            style={mapStyle}
          >
            <Marker
              title="You Are Here"
              position={{
                lat: userCurrentLocation.latitude,
                lng: userCurrentLocation.longitude
              }}
              icon={{ url: '/icons/you-are-here.png' }}
            />

            {hostedEvents.length
              ? hostedEvents.map(e => (
                  <Marker
                    title={e.name}
                    name={e.name}
                    sport={e.sport_name}
                    id={e.id}
                    key={e.id}
                    location={e.location}
                    hostUsername={e.host_username}
                    description={e.description}
                    position={{ lat: e.lat, lng: e.long }}
                    onClick={this.onMarkerClick}
                    event_pic={e.event_pic}
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
                  <div
                    className="left-side"
                    style={{
                      backgroundImage: `url(${selectedEvents.event_pic})`
                    }}
                  />
                  <div className="right-side">
                    <img
                      src={`/icons/${selectedEvents.sport}-icon.png`}
                      className="icon"
                      alt={selectedEvents.name}
                    />
                    <p className="event-name">{selectedEvents.name}</p>
                    <img src="/icons/user-icon.png" className="icon" alt={selectedEvents.name}/>
                    <p>{selectedEvents.hostUsername}</p>
                    <img src="/icons/pin-icon.png" className="icon" alt={selectedEvents.name}/>
                    <p>{selectedEvents.location}</p>
                  </div>
                </div>
              </a>
            </InfoWindow>
          </Map>
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
