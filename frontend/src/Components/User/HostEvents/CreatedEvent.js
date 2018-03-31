import React from "react";
import axios from "axios";
import Template from "./EventTemplate"

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: this.props.event.event,
      delete: false
    };
  }

  handleDelete = () => {
    const { event_id } = this.props;
    axios.delete("/event/delete", { event_id: event_id }).then(
      this.setState({
        delete: true
      })
    )
    .catch(err => console.log('err deleting the event', err));
  };

  form = () => {
    const { event } = this.state;
    const date = new Date(Number(event.start_ts));
    console.log('what i am getting for time',date.toTimeString())
    const end = new Date(Number(event.end_ts));
    return (
      <div className='eventpage'>
        <Template event = { event }/>
        <button onClick={this.handleDelete}>Delete</button>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.state.delete ? <h2>The event has been deleted </h2> : this.form()}
      </div>
    );
  }
}
