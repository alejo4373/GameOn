import React from 'react';

export default class otherUser extends React.Component{
    constructor(){
        super()
    }

    render(){
        return(
            <div>
                <img src={image} alt="event"/>
                <h3>Username <span>{username}</span></h3>
                <h3>Zip Code <span>{zip_code}</span></h3>
                <h3>Exp <span>{exp_points}</span></h3>
            </div>
        )
    }
}