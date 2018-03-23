import React from 'react';
import axios from 'axios';

import Events from './CreatedEvent'

// const Form = () => {

// }

export default class Event extends React.Component{
    constructor(){
        super()

        this.state = {
            Name: '',
            imgScr: null,
            Address: '',
            DateInfo: null,
            startTime: null,
            endTime: null,
            Description: '',
            sport:null,
            lad:null,
            long: null,
            submit: false,
            sports: ['basketball', 'tennis', 'soccer', 'football', 'handball', 'volleyball']

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSelect = (e) => {
        this.setState({
            sport: e.target.value
        })
    }

    handleSubmit = () => {
        this.setState({
            submit: true
        })
    }

    // handleImage = (e) => {
    //     console.log('what we are passing', URL.createObjectURL(e.target.value))
    //     this.setState({
    //         imgScr: URL.createObjectURL(e.target.value)
    //     })
    // }

    // handleSubmit = () => {
    //     const {Name, Address, DateInfo, startTime,imgScr, endTime, Description, sport, lad, long} = this.state

    //     axios.post('',
    //     {name:Name,
    //     lad:40.755603,
    //     long:-73.984931,
    //     location:Address,
    //     start_ts: new Date(DateInfo+ ' ' + startTime).getTime(),
    //     end_ts: new Date(DateInfo+ ' ' + startTime).getTime(),
    //     description:Description,
    //     sport:sport,
    //     event_pic:imgScr
    //  })
    //  .then(this.setState({
    //     Name: '',
    //     Address: '',
    //     DateInfo: null,
    //     startTime: null,
    //     endTime: null,
    //     Description: '',
    //     sport:sport
    //  }))
    // }

    // componentDidMount(){
    //     //will get the user's sports names
    //     axios.get('/sport/all')
    //     .then(sportNames => 
    //         this.setState({
    //             sports:sportNames,
    //             user_id: userID
    //         })
    //     )
    // }

    form =() => {
        const { Name, Address, imgScr, DateInfo, startTime, endTime, Description, sports } = this.state
        return(
        <div>
        <h1>Create An Event</h1>

        <form onSubmit= {this.handleSubmit}>
        
        <input
        type='file'
        name= 'text'
        value= {imgScr}
        onChange={this.handleChange}
        />

        <input
        type='text'
        name='Name'
        value={Name}
        placeholder='Event name'
        onInput= {this.handleChange} />

        <input
        type='text'
        name='Address'
        value={Address}
        placeholder='Address'
        onInput= {this.handleChange} />

        <input
        type='text'
        name='DateInfo'
        value={DateInfo}
        placeholder='Date'
        onInput= {this.handleChange} />

        <input
        type='time'
        name='startTime'
        value={startTime}
        placeholder='Start'
        onInput= {this.handleChange} />

        <input
        type='time'
        name='endTime'
        value={endTime}
        placeholder='End'
        onInput= {this.handleChange} />

        <select onChange ={this.handleSelect} >{['sports', ...sports].map((sport,idx) => 
            <option key={idx} 
            value={sport}>{sport}
            </option>)}
        </select>

        <input
        type='textarea'
        name='Description'
        value={Description}
        placeholder='Description'
        onInput= {this.handleChange} />

        <input
        type='submit'
        value='Create event' />
        </form>
    </div>
    )}
    render(){
        const { submit } = this.state
        const { Name, Address, imgScr, DateInfo, startTime, endTime, Description, sport } = this.state
        console.log(new Date(DateInfo+ ' ' + startTime).getTime())
        console.log(imgScr)
        const event = {sport: sport, Name:Name, date: DateInfo, img:imgScr, Address: Address, date:DateInfo, start:startTime, end: endTime, description: Description}
        return(
            <div>
                {submit? <Events event={event}/> : this.form() }
            </div>
        )
    }
}

// {/* <input
// type='file'
// name='imgScr'
// accept='image/*' 
// onChange={this.handleImage}
// /> */}