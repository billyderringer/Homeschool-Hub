import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Login.css'

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loginTeacher = this.loginTeacher.bind(this)
        this.setTeacherId = this.setTeacherId.bind(this)
        this.logoutTeacher = this.logoutTeacher.bind(this)
    }

    componentWillMount(){

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.loginTeacher()
        this.setState({
            value: ''
        })
    }

    loginTeacher(){
        axios.post('http://localhost:3005/api/v1/teacher/login', {
            "email": this.state.username,
            "password": this.state.password
        })
            .then(res => {
                sessionStorage.setItem('token', res.data.token)
                this.setTeacherId()
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    setTeacherId(){
        axios({
            "url": "http://localhost:3005/api/v1/teacher/me",
            "method": "GET",
            "headers": {
                "Authorization": "Bearer " + sessionStorage.getItem('token')
            }
        })
            .then(res => {
                this.props.setTeacherId(res.data.id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    logoutTeacher(){
        sessionStorage.removeItem('token')
    }

    render(){
        return(
            <div id="container-login"
                 className="center-all-flex">

                <h1>Login</h1>
                <form className="flex-form"
                      id="login-form"
                      onSubmit={this.handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <input id="username"
                           name="username"
                           onChange={this.handleChange}
                           type="email"/>
                    <label htmlFor="password">Password: </label>
                    <input id="password"
                           name="password"
                           onChange={this.handleChange}
                           type="password"/>
                    <input type="submit"
                           value="Login"/>
                    <Link to="/register"
                          className="green-button center-all-flex"
                    >Sign Up
                    </Link>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        setTeacherId:(teacherId) => {
            const action = {type: 'SET_TEACHER_ID', teacherId}
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps) (Login)