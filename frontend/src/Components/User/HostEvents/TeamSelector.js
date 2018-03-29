import { Modal, Button } from "react-bootstrap";
import React from "react";

export default class Team extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const { show, handleClose, selectTeam, joinEvent } = this.props;
        return (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <Modal.Title>Choose your team</Modal.Title>
            </Modal.Header>
      
            <Modal.Body>
              <button class='popup A' value="A" onClick={selectTeam}>
                Team A
              </button>
              <br />
              <button class='popup B' value="B" onClick={selectTeam}>
                Team B
              </button>
            </Modal.Body>
      
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
              <Button bsStyle="primary">GameOn</Button>
            </Modal.Footer>
          </Modal>
        );
    }
  };