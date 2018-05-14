import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";

/*
  Global variable to hold autocomplete object once 
  is created from the google.maps.places.Autocomplete
  constructor left globally so that we can check if we 
  already have an autocomplete and don't set up a new one
  if so
*/
let autocomplete = null

class Search extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = null; //Will hold reference to text input DOMElement
  }

  //Grab input ref so that we can build the text input with google
  //autocomplete capabilities as shown in setUpAutoComplete()
  grabInputRef = el => {
    this.textInputRef = el;
  };

  componentDidUpdate() {
    /*
      GoogleApiWrapper will pass the google object as props
      causing this life cycle method to be called but as I think
      loading the google api script is an async call the google
      object is not passed in the initial props, but once the component
      receive new props i.e the google script fully loaded is then 
      that we want to instantiate an autocomplete object with 
      setUpAutocomplete() 
    */
    this.setUpAutocomplete()
  }

  setUpAutocomplete = () => {
    const google = this.props.google; 
    /*
      Check if we have the google obj in props which we don't 
      the fist time around and therefore we dont want to try
      creating an autocomplete object from something that is not 
      there yet 
    */

   //If we dont have google yet or we already have an autocomplete
   //dont set up one
    if (!google || autocomplete) { 
      return; 
    }
    autocomplete = new google.maps.places.Autocomplete(this.textInputRef);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("!place.geometry", "no place geometry");
      }
      console.log(place)
      //If place doesn't have a name, place.name will be set to the part before the fist comma
      //and we do not want a full address with repeated info so here we check and adjust 
      const fullAddress = place.formatted_address.split(',')[0] === place.name 
                          ? place.formatted_address 
                          : place.name + ', ' + place.formatted_address
      const placeInfo = {
        address: fullAddress,
        lat: place.geometry.location.lat(),
        long: place.geometry.location.lng(),
      }
      this.props.handleAddressInput(placeInfo);
    });
  }

  render() {
    if(!this.props.google) {
      return (<div>Loading....</div>)
    }
    return (
        <input 
          ref={this.grabInputRef}
          required
          className="event-form"
          type="text"
          placeholder="Type an address"
          style={{ color: "black" }}
        />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE",
  version: "3.31"
})(Search);
