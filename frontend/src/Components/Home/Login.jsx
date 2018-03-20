import React, { Component } from 'react';
import './Login.css';
import { Grid, Jumbotron, Forms, Button, PageHeader, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <Grid>
                <Jumbotron>
                    <PageHeader>
                        Game On! <br /><small>Let's Play. Game On!</small>
                    </PageHeader>
                   
                </Jumbotron>
                <form>
                    <FormGroup controlId="formControlsSelect" >
                        <FormControl 
                            bsSize="large"
                            type="input" 
                            placeholder="Username or E-mail">
                        </FormControl>
                        <br/>
                        <FormControl 
                            bsSize="large"
                            type="input" 
                            placeholder="Password">
                        </FormControl>
                    </FormGroup>
                    <Button 
                        id="loginSubmitButton"
                        type="submit"
                    >Submit</Button>
                    <p>OR</p>
                    <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </form>
            </Grid>
        )
    }
};
