import React, { Component } from "react";
import axios from 'axios'


class SportTiles extends Component {
  state = {
    sports: []
  };


  getAllSports = () => {
    axios
    .get('/sports/all')
    .then(res => {
      console.log("Sports:", res)
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
    console.log(sports)
    return (
      <div className="parent">
        <span className="sport_name">
          <h1>Select A Sport (Minimum 1 Selection)</h1>
        </span>

        {/* <div id="selection_container"> */}
          {sports.map(s => (
            <div
              className="sport_selection"
              name={s.name}
              id={s.id}
              onClick={handleSelectionChanges}
            >
              <span className="sport_name">
                <h4>{s.name}</h4>
              </span>
              <img src={`/images/${s.name}.png`} width={"200px"} height={'200px'} name={s.name} id={s.id} alt="" />
            </div>
          ))}
        {/* </div> */}
      
        <button onClick={handleNextButton}>Next</button>
      </div>
    );
  }
}

export default SportTiles;

{/* <Grid>
<Jumbotron bsClass="RegistrationJumbotron">
  <PageHeader>
    Game On! <br />
    <small>Select A Sport (Minimum: 1 Selection)</small>
  </PageHeader>
</Jumbotron>
<Row>
  <Col xs={6} md={4}>
    <Image src={`/images/${s}.png`} rounded />
  </Col>
</Row>
</Grid> */}

