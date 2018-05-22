import React, { Component } from "react";
import { Table } from 'react-bootstrap';

import "./leaderboard.css";
import axios from "axios";


class Leaderboard extends Component {
  state = {
    topThree: [],
    remainingPlayers: []
  };

  getAllPlayers = () => {
    axios
      .get("/user/all")
      .then(res => {
        this.setState({
          topThree: res.data.data.slice(0, 3),
          remainingPlayers: res.data.data.slice(3),
        });
      })
      .catch(err => console.log("Error Fetching Players:", err));
  };

  componentDidMount() {
    this.getAllPlayers();
  }

  render() {
    const { remainingPlayers, topThree } = this.state;

    return (
      <div className='leaderboard'>
        <div className='two-sided'>
          <div className='left'>
            <div className='card'>
              {topThree.map((p, i) => {
                  return (
                    <div key={i} className='top-three'>
                      <img
                        src={p.profile_pic}
                        alt={p.username}
                      />
                      <p>{p.username}</p>
                      <p>{p.exp_points}</p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="right">
              <div className="card">
                <Table condensed hover>
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Score</th>
                      <th>Player</th>
                    </tr>
                  </thead>
                  <tbody>
                  {remainingPlayers.map((p, i) => {
                    return (
                      <tr>
                        <td className='valign-middle'>{i + 3}</td>
                        <td className='valign-middle'>{p.exp_points}</td>
                        <td className='valign-middle'>
                          <img
                            id={`player-${i}-pic`}
                            src={p.profile_pic}
                            width={"50px"}
                            alt=""
                          />
                          <p>{p.username}</p>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Leaderboard;
