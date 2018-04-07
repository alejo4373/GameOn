import React, { Component } from "react";
import "./leaderboard.css";
import axios from "axios";


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
          <div id="leaderboard-grid">
            <div id="player-container">
              <div id="top3">
                {topThree.map((p, i) => {
                  if (i === 0) {
                    return (
                      <div id={`player-${i}`}>
                        <img
                          id={`player-${i}-pic`}
                          src={p.profile_pic}
                          width={"125px"}
                          alt=""
                        />
                        <h5 id="top3-username" style={{ color: "black" }}>
                          {p.username}
                        </h5>
                        <h5 id="top3-exp" style={{ color: "black" }}>
                          {p.exp_points}
                        </h5>
                      </div>
                    );
                  } else if (i === 1) {
                    return (
                      <div id={`player-${i}`}>
                        <img
                          id={`player-${i}-pic`}
                          src={p.profile_pic}
                          width={"100px"}
                          alt=""
                        />
                        <h5 id="top3-username" style={{ color: "black" }}>
                          {p.username}
                        </h5>
                        <h5 id="top3-exp" style={{ color: "black" }}>
                          {p.exp_points}
                        </h5>
                      </div>
                    );
                  } else if (i === 2) {
                    return (
                      <div id={`player-${i}`}>
                        <img
                          id={`player-${i}-pic`}
                          src={p.profile_pic}
                          width={"75px"}
                          alt=""
                        />
                        <h5 id="top3-username" style={{ color: "black" }}>
                          {p.username}
                        </h5>
                        <h5 id="top3-exp" style={{ color: "black" }}>
                          {p.exp_points}
                        </h5>
                      </div>
                    );
                  }
                  return(
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
                  )
                })}
              </div>
            </div>
            <div className="headers" />
            <div id="leaderboard-table-container">
              <div className="headers-container">
                <h3 id="rank">Rank</h3>
                <h3 id="player">Player</h3>
                <h3 id="score">Score</h3>
              </div>
              {players.map((p, i) => {
                if (i > 2) {
                  return (
                    <div className="player-card">
                      <p id="rank-number">{i + 1}</p>
                      <div id="player-info">
                        <span>
                          <img
                            id={`player-${i}-pic`}
                            src={p.profile_pic}
                            width={"50px"}
                            alt=""
                          />
                        </span>
                        <span>{p.username}</span>
                      </div>
                      <p id="score-points">{p.exp_points}</p>
                    </div>
                  );
                }
                 // eslint-disable-next-line 
                return
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Leaderboard;
