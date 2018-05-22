import React, { Component } from 'react';
import axios from 'axios';

class SportsSelectionOptions extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedSportsIds: [],
      sports: [],
      msg: ''
    }
  }
  
  getAllSportsToPickFrom = () => {
    axios.get('/sport/all')
      .then(res => {
        this.setState({
          sports: res.data.sports
        })
      })
      .catch(err => {
        this.setState({
          msg: 'There was a network error'
        })
        console.log(err)
      })
  }

  componentDidMount() {
    this.getAllSportsToPickFrom();
  }

  render() {
    const { handleSportsSelection, selectedSportsIds } = this.props
    const { sports } = this.state
    return(
      <div className='sports-selection-options'>
        {
          sports.map((sport, i) => (
            <div 
              key={i}
              className='icon-container'
              name={sport.name}
            >
              {
                //If current sport-icon is the one user selected put checkmark in front of it
                //To show it has been selected
                selectedSportsIds.includes(sport.id.toString())
                ? <img 
                  className='checkmark'
                  src='/icons/checkmark.png'
                  alt='checkmark symbol'
                  //Need to put the sport id in the checkmark as well as the event
                  // listener because once the checkmark is on top of the icon
                  //the click event doesn't reach the icon and we cannot deselect 
                  id={i + 1} 
                  onClick={(e) => handleSportsSelection(e.target.id)}
                />
                :''
              }
              <img
                src={`/icons/${sport.name}-icon.png`}
                alt={sport.name}
                title={sport.name}
                id={sport.id} 
                name={sport.name}
                className='sport-icon'
                onClick={(e) => handleSportsSelection(e.target.id)}
              />
            </div>
          ))
        }
      </div>
    )
  }
}

export default SportsSelectionOptions