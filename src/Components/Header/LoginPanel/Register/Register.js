import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'
import './Register.css'

import './Register.css'

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.registerTeacher = this.registerTeacher.bind(this)
        this.loginTeacher = this.loginTeacher.bind(this)
        this.switchModal = this.switchModal.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    handleSubmit(event) {
        event.preventDefault()
        this.registerTeacher()
        this.setState({
            value: ''
        })
    }

    switchModal(){
        this.props.closeRegister()
        this.props.openLogin()
    }

    registerTeacher(){
        axios.post('http://localhost:3005/api/v1/teacher/register', {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "email": this.state.username,
            "password": this.state.password
        })
            .then(res => {
                console.log(res)
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    loginTeacher(){
        axios.post('http://localhost:3005/api/v1/teacher/login', {
            "email": this.state.username,
            "password": this.state.password
        })
            .then(res => {
                sessionStorage.setItem('token', res.data.token)
            })
            .catch(function (error) {
                console.log(error);
            })
        this.setTeacherId()
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

    render(){
        return(
            <div id="container-register"
                 className="center-all-flex">
                <Modal className="modal-register"
                       isOpen={this.props.registerState}
                       onRequestClose={this.closeLogin}
                       ariaHideApp={false}
                       contentLabel="Register Modal">
                <h1>Register</h1>
                <form className="flex-form"
                      id="login-form"
                      onSubmit={this.handleSubmit}>
                    <label htmlFor="first-name-register">First Name: </label>
                    <input id="first-name-register"
                           name="firstName"
                           onChange={this.handleChange}
                           type="text"/>
                    <label htmlFor="last-name-register">Last Name: </label>
                    <input id="last-name-register"
                           name="lastName"
                           onChange={this.handleChange}
                           type="text"/>
                    <label htmlFor="username">Email: </label>
                    <input id="username-register"
                           name="username"
                           onChange={this.handleChange}
                           type="email"/>
                    <label htmlFor="password-register">Password: </label>
                    <input id="password"
                           name="password"
                           onChange={this.handleChange}
                           type="password"/>
                    <input type="submit"
                           value="Register"
                           className="green-button"/>
                    <button onClick={this.switchModal}
                            className="green-button center-all-flex"
                    >Login
                    </button>

                </form>
                    <button onClick={this.props.closeRegister}
                            className="green-button center-all-flex"
                    >Cancel
                    </button>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        registerTeacher:(teacher) => {
            const action = {type: 'REGISTER_TEACHER', teacher}
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps) (Register)