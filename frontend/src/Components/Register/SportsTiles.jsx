import React, { Component } from "react";
import axios from 'axios'
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
    sports: []
  };


  getAllSports = () => {
    axios
    .get('/sports/all')
    .then(res => {
      this.setState({
        sports: res.data.sports
      })
    })
    .catch(err => console.log("Error Getting All Sports:", err))
  }

  componentWillMount(){
   this.getAllSports()
  }

  render() {
    const { handleSelectionChanges, handleNextButton } = this.props;
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
              name={s.name}
              id={s.id}
              onClick={handleSelectionChanges}
            >
              <h4>{s.name}</h4>
              <Row>
                <Col xs={6} md={4}>
                  <Image
                    src={`/images/${s.name}.png`}
                    width={"200px"}
                    height={"200px"}
                    id={s.id}
                    name={s.name}
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
