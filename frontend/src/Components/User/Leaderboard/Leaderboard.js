import React, { Component } from "react";
import './leaderboard.css'
import axios from "axios";
import {
    ListGroup,
    ListGroupItem,
} from 'react-bootstrap'


class Leaderboard extends Component {
  state = {
    players: []
  };

  getAllPlayers = () => {
    axios
      .get("/user/all")
      .then(res => {
        this.setState({
          players: res.data.data
        });
      })
      .catch(err => console.log("Error Fetching Players:", err));
  };

  componentWillMount() {
    this.getAllPlayers();
  }
  render() {
    const { players } = this.state;
    console.log("Leaderboard-player:", players)
    return (
      <div id="leaderboard_parent">
        <span>LEADERBOARD</span>
        <ListGroup id="leaderboard_container">
          <ListGroupItem id="leaderboard_header">
            <span>Player</span>
            {/* <span>Medal</span>
                        <span>Rank</span> */}
            <span>Score</span>
            {/* <span>Wins</span>
                        <span>Losses</span>    */}
          </ListGroupItem>
        {players.map(p => {
          return(
          <ListGroupItem className="leaderboard-individual-player">
            <div
              className="leaderboard-profile-pic-container"
            >
              {
                <img
                  className="leaderboard-profile-pic"
                  src={p.profile_pic}
                  width ={'50px'}
                />
              }
            </div>
            <div className='leaderboard-username-container'>
                {p.username}
            </div>
        
            <div className='leaderboards-player-points'>
                {p.exp_points}
            </div>
          </ListGroupItem>
        )})}
        </ListGroup>
      </div>
    );
  }
}

export default Leaderboard;



