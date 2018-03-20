import React, { Component } from 'react';
import { Route, /*Link*/ Switch} from 'react-router-dom'
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Home/Login'
import Registration from './Components/Register/Registration'
import Dashboard from './Components/User/Dashboard'



class App extends Component {
    render() {

        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Registration}/>
                    <Route exact path="/user" component={Dashboard}/>
                </Switch>
            </div>
        )
    }
}

export default App;
