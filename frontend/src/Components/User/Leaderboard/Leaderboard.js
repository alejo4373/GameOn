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
    const { players, topThree, } = this.state;
    console.log("Leaderboard-player:", players);



    console.log("Top Three:", topThree);

    return (
      <div id="leaderboard-body">
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="leaderboard-tab"
        >
            <Tab eventKey={1} title="Top Three">
              <div id="olympic_rank_container">
                {topThree.map((p,i) => {
                  return (
                    <div id={`player-${i}`}>
                     <h5 style={{color: 'white'}}>{p.username}</h5> 
                      <img id={`player-${i}-pic`} src={p.profile_pic} width={'75px'}/>
                     <h5 style={{color: 'white'}}>{p.exp_points}</h5>
                    </div>
                  );
                })}
                <img src="/images/leaderboard-rank-2.png" id='leaderboard-rank-pic' />
              </div>
            </Tab>
          )}
          <Tab eventKey={2} title="All">
            <div id="leaderboard_parent">
              <h2 style={{ color: "white" }} id="">
                LEADERBOARD
              </h2>
              <ListGroup id="leaderboard_container">
                <ListGroupItem id="leaderboard_header">
                  <div>Player</div>
                  {/* <div>Medal</div>
                        <div>Rank</div> */}
                  <div>Score</div>
                  {/* <div>Wins</div>
                        <div>Losses</div>    */}
                </ListGroupItem>
                {players.map(p => {
                  return (
                    <ListGroupItem className="leaderboard-individual-player">
                      <div className="leaderboard-profile-pic-container">
                        {
                          <img
                            className="leaderboard-profile-pic"
                            src={p.profile_pic}
                            width={"50px"}
                          />
                        }
                      </div>
                      <div className="leaderboard-username-container">
                        {p.username}
                      </div>

                      <div className="leaderboards-player-points">
                        {p.exp_points}
                      </div>
                    </ListGroupItem>
                  );
                })}
              </ListGroup>
            </div>
          </Tab>
          {/* <Tab eventKey={3} title="Tab 3" disabled>
            Tab 3 content
          </Tab> */}
        </Tabs>
      </div>
    );
  }
}

export default Leaderboard;
