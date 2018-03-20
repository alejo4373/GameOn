import React, { Component } from 'react';
import { Route, Link, Switch} from 'react-router-dom'
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Home/Login.jsx'
import Register from './Components/Register/Form.jsx'


class App extends Component {
    render() {

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                </Switch>
            </div>
        )
    }
}

export default App;
