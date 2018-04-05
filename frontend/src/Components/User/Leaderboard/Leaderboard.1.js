import React, { Component } from "react";
import "./leaderboard.css";
import axios from "axios";
import { ListGroup, ListGroupItem, Tabs, Tab } from "react-bootstrap";

class Leaderboard extends Component {
  state = {
    players: [],
    topThree: []
  };

  getAllPlayers = () => {
    axios
      .get("/user/all")
      .then(res => {
        this.setState({
          players: res.data.data,
          topThree: [res.data.data[0], res.data.data[1], res.data.data[2]]
        });
      })
      .catch(err => console.log("Error Fetching Players:", err));
  };

  componentWillMount() {
    this.getAllPlayers();
  }
  render() {
    const { players, topThree } = this.state;
    console.log("Leaderboard-player:", players);

    console.log("Top Three:", topThree);

    return (
      <div id="leaderboard-body">
        <div id="leaderboard-container">
          <h2 id="leaderboard_header">LEADERBOARD</h2>
          <div id="top3">
            {topThree.map((p, i) => {
              return (
                <div id={`player-${i}`}>
                  <h5 style={{ color: "black" }}>{p.username}</h5>
                  <img
                    id={`player-${i}-pic`}
                    src={p.profile_pic}
                    width={"75px"}
                    alt=""
                  />
                  <h5 style={{ color: "black" }}>{p.exp_points}</h5>
                </div>
              );
            })}
          </div>
          <div id="leaderboard-table-container">
          <table id="leaderboard-table">
              {/* <thead id="table-header"> */}
                <tr>
                  {/* <div id="span"> */}
                  <td id="rank">Rank</td>
                  <td id="player">Player</td>
                  <td id="score">Score</td>
                  <td id="games-played">Games Played</td>
                  {/* </div> */}
                </tr>
              {/* </thead> */}
              
              {/* <tbody id="tablebody"> */}
                {players.map((p, i) => {
                  return (
                    <tr id="LeaderBoard">
                      <td id="rank-number">{i + 1}</td>
                      <td id="player-info">
                        {" "}
                        <img
                          id={`player-${i}-pic`}
                          src={p.profile_pic}
                          width={"50px"}
                          alt=""
                        />{" "}
                        {p.username}
                      </td>
                      <td id="score-points">{p.exp_points}</td>
                      <td id="games"></td>
                    </tr>
                  );
                })}
              {/* </tbody> */}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
