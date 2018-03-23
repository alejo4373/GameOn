import React, { Component } from "react";

export default class ProfileSports extends Component {
  render() {
    const { sports } = this.props;
    console.log(sports);
    return (
      <div>
        {sports.map(s => (
          <div className="profile_sport">
            <span>{s.name}</span>
            <img
              src={`/images/${s.name}.png`}
              width={"200px"}
              height={"200px"}
              name={s.name}
              id={s.id}
              alt=""
            />
          </div>
        ))}
      </div>
    );
  }
}
