import React, { Component } from 'react';
import { Route, /*Link*/ Switch} from 'react-router-dom'
import './App.css';

import Home from './Components/Home/Home';
import UserAuth from './Components/Home/UserAuth'
import HUB from './Components/User/HUB'

class App extends Component {
    render() {
        return (
            // <div id="globalContainer">
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={UserAuth}/>
                    <Route  path="/user" component={HUB}/>
                </Switch>
            // </div>
        )
    }
}

export default App;
