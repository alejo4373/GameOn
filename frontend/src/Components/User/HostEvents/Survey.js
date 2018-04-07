import React, { Component } from "react";
import axios from "axios";
import { FormGroup, ButtonToolbar, Radio, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import { Redirect } from "react-router";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import Tooltip from "rc-tooltip";
import Slider from "rc-slider";

import Notifications from '../Notification'

const Handle = Slider.Handle;

export default class Survey extends Component {
  state = {
    message: "",
    winner: "",
    likeness: "",
    gameEnded: false,
    show: true,
    send: false,
  };
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

  handleSelectors = e => {
    const winner = e.target.value;

    this.setState({
      winner: winner
    });
  };

  handleWinner = () => {
    const { event } = this.props;
    const { winner } = this.state;
    const teamA = event.players.filter(player => player.team === "A");
    const teamB = event.players.filter(player => player.team === "B");
    if (winner === "teamA") {
      axios
        .patch(`/event/end/${event.id}`, {
          actual_end_ts: event.actual_end_ts,
          winner_team: "A",
          winner_team_members: JSON.stringify(teamA),
          loser_team_members: JSON.stringify(teamB)
        })
        .then(() => {
          this.setState({
            message: "Congrats to Team A",
            gameEnded: true
          });
        })
        .catch(err => {
          console.log("Error:", err);
        });
    } else if (winner === "teamB") {
      axios
        .patch(`/event/end/${event.id}`, {
          actual_end_ts: event.actual_end_ts,
          winner_team: "B",
          winner_team_members: JSON.stringify(teamB),
          loser_team_members: JSON.stringify(teamA)
        })
        .then(() => {
          this.setState({
            message: "Congrats to Team B",
            gameEnded: true
          });
        })
        .catch(err => {
          console.log("Error:", err);
        });
    }

    this.sendNotifications()
  };

  sendNotifications = () => {
    const {send} = this.state
    return <Notifications show={send} />
  }

  render() {
    const { gameEnded, show } = this.state;

    if (gameEnded) {
      this.setState({
        gameEnded: false
      });
      return <Redirect to="/user/dashboard" />;
    }
    return (
      <div className="survey-parent">
        <Modal show={show} >
          <Modal.Body  bsClass='survey-modal'>
            <h2>Who Won The Game</h2>
            <FormGroup onChange={this.handleSelectors}>
              <Radio name="winnerGroup" inline value="teamA">
                Team A 
              </Radio>
              
              <Radio name="winnerGroup" inline value="teamB">
                Team B 
              </Radio>{" "}
            </FormGroup>
            <ButtonToolbar
              style={{ marginLeft: "42%" }}
              onClick={this.handleWinner}
            >
              <Button bsStyle="success">Finish</Button>
            </ButtonToolbar>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
