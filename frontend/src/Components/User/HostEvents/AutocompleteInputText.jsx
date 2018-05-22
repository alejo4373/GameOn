import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";

//Component made following https://github.com/fullstackreact/google-maps-react/blob/master/examples/components/autocomplete.js example
class AddressSearchInput extends Component {
  constructor(props) {
    super(props);
    this.textInputRef = null; //Will hold reference to text input HTMLInputElement
  }

  //Grab input ref so that we can build the text input with google
  //autocomplete capabilities as shown in setUpAutoComplete()
  grabInputRef = el => {
    this.textInputRef = el;
  };

  //Once we receive the google object in the props this method will fire
  //then we want to setUpAutoComplete()
  componentDidUpdate(prevProps) {
    this.setUpAutocomplete();
  }

  setUpAutocomplete = () => {
    const google = this.props.google; 
    /*
      Check if we have the google obj in props which again we don't 
      the fist time around and therefore we dont want to try
      creating an autocomplete object from something that is not 
      there yet 
    */
    if (!google)  {
      return;
    }

    //Else
    const autocomplete = new google.maps.places.Autocomplete(this.textInputRef);
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        console.log("Error no place geometry");
      }

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

const AutocompleteInputText = GoogleApiWrapper({
  apiKey: "AIzaSyAulk5PFU6VTLLaBMnENrJGrKNlGjKnzhE",
  version: "3.31"
})(AddressSearchInput)

export default AutocompleteInputText;
