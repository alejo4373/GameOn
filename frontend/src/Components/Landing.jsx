import React, { Component } from "react";
import "./Landing.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthForms from "./Landing/AuthForms";

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="top">
          <nav>
            <div className="global-logo">
              <Link to="/user/dashboard"><img id="logo" src='/images/gameon-logo.png' alt='gameon-logo'/></Link>
            </div>
            <div className="auth-nav">
              <ul>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  or
                </li>
                <li>
                  <Link to='/signup'>Signup</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="bottom">
          <Carousel
            controls={false}
            // interval={null}
            indicators={false}
            pauseOnHover={false}
          >
            <Carousel.Item>
              <img src="/images/slides/soccer.jpg" />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/slides/football.jpg" alt='' />
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/slides/basketball.jpg" alt='' />
            </Carousel.Item>
          </Carousel>
           <div className="overlay">
            <AuthForms location={this.props.location}/>
           </div>
        </div>
      </div>
    );
  }
}
