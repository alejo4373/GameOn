import React, { Component } from 'react';
import './Form.css'
import axios from "axios";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Col, Grid, Jumbotron, Form, Button, PageHeader, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'


export default class Registration extends Component {
    state = {
        emailInput: "",
        fullNameInput: "",
        usernameInput: "",
        passwordInput: "",
        confirmInput: "",
        zipcodeInput: "",
        message: "",
        registered: false
    };

    handleUsernameChange = e => {
        this.setState({
            usernameInput: e.target.value
        });
    };

    handlePasswordChange = e => {
        this.setState({
            passwordInput: e.target.value
        });
    };

    handleConfirmChange = e => {
        this.setState({
            confirmInput: e.target.value
        });
    };

    handleEmailChange = e => {
        this.setState({
            emailInput: e.target.value
        });
    };

    handleFullNameChange = e => {
        this.setState({
            fullNameInput: e.target.value
        });
    };

    handleZipCodeChange = e => {
        if (typeof e.target.value === "number") {
            this.setState({
                zipcodeInput: e.target.value
            });
        }
    };

    submitForm = e => {
        e.preventDefault();
        const {
            usernameInput,
            passwordInput,
            confirmInput,
            emailInput,
            fullNameInput,
            registered,
            zipcodeInput
        } = this.state;
        if (
            !usernameInput ||
            !passwordInput ||
            !confirmInput ||
            !emailInput ||
            !fullNameInput ||
            !zipcodeInput
        ) {
            this.setState({
                passwordInput: "",
                confirmInput: "",
                message: "Please complete all required fields"
            });
            return;
        }
        if (passwordInput.length <= 7) {
            this.setState({
                passwordInput: "",
                confirmInput: "",
                message: "Password length must be at least 8 characters"
            });
            return;
        }
        if (passwordInput !== confirmInput) {
            this.setState({
                passwordInput: "",
                confirmInput: "",
                message: "Passwords do not match!"
            });
            return;
        }
        axios
            .post("", {
                username: usernameInput,
                password: passwordInput,
                email: emailInput,
                full_name: fullNameInput,
                zipcode: zipcodeInput
            })
            .then(res => {
                console.log(res.data);
                this.setState({
                    registered: true,
                    message: `Welcome to the site ${this.state.usernameInput}`
                });
            })
            .catch(err => {
                console.log("error: ", err);
                this.setState({
                    usernameInput: "",
                    passwordInput: "",
                    confirmInput: "",
                    emailInput: "",
                    usernameInput: "",
                    message: "Error inserting user"
                });
            });
    };
    render() {
        const {
            emailInput,
            fullNameInput,
            usernameInput,
            passwordInput,
            confirmInput,
            message,
            registered,
            zipcodeInput
        } = this.state;
        const {
            submitForm,
            handleEmailChange,
            handleFullNameChange,
            handleUsernameChange
        } = this;
        if (registered) {
            axios
                .post("/users/login", {
                    username: usernameInput,
                    password: passwordInput
                })
                .then(res => {
                    this.setState({
                        message: "success"
                    });
                })
                .catch(err => {
                    this.setState({
                        message: "username/password not found"
                    });
                });
            return <Redirect to="/user" />;
        }

        return (
            <Grid>
                <Jumbotron bsClass="RegistrationJumbotron">
                    <PageHeader>
                        Game On! <br /><small>Sign Up To Play, Compete, and Rank-Up</small>
                    </PageHeader>
                </Jumbotron>

                <Form horizontal onSubmit={submitForm}>
                    <FormGroup controlId="formControlsSelect">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                name="Email"
                                placeholder="Email"
                                value={emailInput}
                                onChange={handleEmailChange}
                            >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Full Name
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                name="Full name"
                                placeholder="Full name"
                                value={fullNameInput}
                                onChange={handleFullNameChange}
                            >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Username
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={usernameInput}
                                onChange={handleUsernameChange}
                            >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Zipcode
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                name="zip_code"
                                placeholder="Zipcode"
                                value={zipcodeInput}
                                onChange={this.handleZipCodeChange}
                            >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={passwordInput}
                                onChange={this.handlePasswordChange}
                            >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Confirm Password
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="password"
                                name="confirm-input"
                                placeholder="Confirm Password"
                                value={confirmInput}
                                onChange={this.handleConfirmChange}
                            >
                            </FormControl>
                        </Col>
                    </FormGroup>

                    <Button
                        id="loginSubmitButton"
                        type="submit"
                    >Sign Up</Button>
                    <p>{message}</p>
                    <p>Have an account? <br/>
                        <Link to="/login">Log In</Link>
                    </p>
                </Form>
            </Grid>
        )
    }
};
