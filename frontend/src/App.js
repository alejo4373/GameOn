import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import './App.css';

import Landing from './Components/Landing'
import HUB from './Components/User/HUB'

class App extends Component {
    render() {
      return (
        <Switch>
            <Route path="/user" component={HUB}/>
            <Route path="/" component={Landing}/>
        </Switch>
      )
    }
}

export default App;
