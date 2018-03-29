export default Team = props => {
    const { show, handleClose, selectTeam, joinEvent } = props;
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
  };