import React, { Component } from "react";
import {
  Col,
  Grid,
  Jumbotron,
  Form,
  Button,
  PageHeader,
  FormGroup,
  ControlLabel,
  FormControl,
  Image,
  Row,
  Well
} from "react-bootstrap";
import "./SportsTile.css";


export default class SportTiles extends Component {
  state = {
    sports: [
      "Soccer",
      "Football",
      "Handball",
      "Tennis",
      "Basketball",
      "Volleyball"
    ],
    // style: ""
  };

  handleSelectionChanges = (e) => {
    let sportDiv = e.target.id
    this.state.sports.map(s => {
      if (sportDiv === s) {
        console.log(s)
      }
    })
  }

  render() {
    const { handleSelectionChanges, handleNextButton, color } = this.props;
    const { sports } = this.state;
    return (
      <Grid>
        <Jumbotron bsClass="RegistrationJumbotron">
          <PageHeader>
            Game On! <br />
            <small>Select A Sport (Minimum: 1 Selection)</small>
          </PageHeader>
        </Jumbotron>
        <div id="sportsTile_Container">
          {sports.map(s => (
            <Grid
              // style={this.state.style}
              className="sport_selection"
              id={s}
              onClick={handleSelectionChanges}
            >
              <h4>{s}</h4>
              <Row>
                <Col xs={6} md={4}>
                  <Image
                    src={`/images/${s}.png`}
                    width={"200px"}
                    height={"200px"}
                    id={s}
                    alt=""
                    circle
                  />
                </Col>
              </Row>
            </Grid>
          ))}
        </div>
        <Button type="submit" bsClass="next" onClick={handleNextButton}>
          Next
        </Button>
      </Grid>
    );
  }
}
