import React from "react";
import axios from "axios";
import Template from "./EventTemplate"

export default class Events extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      event: '',
      delete: false
    };
  }

  componentDidMount(){
    const id = this.props.match.params.id;
    axios
    .get(`/event/info/${id}`)
    .then(res =>{
      this.setState({
        event: res.data.event
      })
    }
    )
    .catch(err => console.log('err retrieving the event info', err));
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
        {this.state.delete ?<h2>The event has been deleted </h2>:
        <div>
        <div className="event_header" style={{backgroundImage: `url(${event.event_pic})`}}>
          <h3 className="title">{event.name}</h3>
          </div>
        <Template event = { event }/>
        <button onClick={this.handleDelete}>Delete</button>
        </div>}
      </div>
    );
  };

  render() {
    console.log('the id that is getting called', this.props.match.params.id)
    console.log('the event that is being render', this.state.event.event)
    return (
      <div>
        {this.state.event? this.form(): ""}
        {/* {this.state.delete ? <h2>The event has been deleted </h2> : this.form()} */}
      </div>
    );
  }
}
