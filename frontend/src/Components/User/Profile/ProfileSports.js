import React, { Component } from "react";
import {
  Col,
  Grid,
  Image,
  Row
} from "react-bootstrap";

export default class ProfileSports extends Component {
  render() {
    const { sports } = this.props;
    console.log(sports);
    return (
      <div id='profile-sport-container'>
        {sports.map(s => (
            <Grid
              // style={this.state.style}
              className="sport_selection"
              name={s.name}
              id={s.id}
            >
              <h4>{s.name}</h4>
              <Row>
                <Col xs={6} md={4}>
                  <Image
                    src={`/images/${s.name}.png`}
                    width={"100px"}
                    height={"100px"}
                    id={s.id}
                    name={s.name}
                    alt=""
                    
                  />
                </Col>
              </Row>
            </Grid>
          ))}
          <Grid className='add-sport-button'>
          
              <Col>
              <Image
                    id='add-button'
                    src={`/images/add.png`}
                    width={"140px"}
                    height={"200px"}
                    alt=""
                    
                  />
            </Col>
            
            
          </Grid>
      </div>
    );
  }
}
