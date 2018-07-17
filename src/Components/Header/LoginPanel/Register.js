import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'

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
                       contentLabel="Register Modal"
                       style={{
                           overlay: {
                               display: 'flex',
                               justifyContent: 'center',
                               alignItems: 'center',
                               backgroundColor: 'rgba(0,0,0,.75)',
                               color: 'rgba(255,255,255,.8)'
                           },
                           content: {
                               top: 'auto',
                               bottom: 'auto',
                               left: 'auto',
                               right: 'auto',
                               padding: '40px 20px',
                               borderRadius: '0',
                               border: 'none',
                               outline: 'none',
                               backgroundColor: 'rgba(0,0,0,.8)',
                               color: 'rgba(255,255,255,.8)'
                           }
                       }}>
                    <div id="modal-login"
                         className="modal-container"
                         style={{textAlign: 'center'}}>
                        <h2 style={{marginBottom: '20px'}}>
                            REGISTER
                        </h2>
                        <img src={require("../../../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                             alt="homeschool hub logo" />
                        <p style={{margin: '20px 0 40px'}}>
                            Welcome to Homeschool Hub!
                        </p>
                    <form className="flex-form"
                          id="login-form"
                          onSubmit={this.handleSubmit}>
                        <input id="first-name-register"
                               name="firstName"
                               onChange={this.handleChange}
                               type="text"
                               placeholder="First Name"
                               required
                               style={{
                                   margin: '10px 0',
                                   padding: '5px',
                                   color: '#fff',
                                   backgroundColor: 'rgba(255,255,255,.1)'
                               }}/>
                        <input id="last-name-register"
                               name="lastName"
                               onChange={this.handleChange}
                               type="text"
                               placeholder="Last Name"
                               required
                               style={{
                                   margin: '10px 0',
                                   padding: '5px',
                                   color: '#fff',
                                   backgroundColor: 'rgba(255,255,255,.1)'
                               }}/>
                        <input id="username-register"
                               name="username"
                               onChange={this.handleChange}
                               type="email"
                               placeholder="Email"
                               required
                               style={{
                                   margin: '10px 0',
                                   padding: '5px',
                                   color: '#fff',
                                   backgroundColor: 'rgba(255,255,255,.1)'
                               }}/>
                        <input id="password"
                               name="password"
                               onChange={this.handleChange}
                               type="password"
                               placeholder="Password"
                               required
                               style={{
                                   margin: '10px 0',
                                   padding: '5px',
                                   color: '#fff',
                                   backgroundColor: 'rgba(255,255,255,.1)'
                               }}/>
                        <div style={{textAlign: 'left'}}>
                            <button type="submit"
                                    className="green-button"
                                    style={{marginLeft: '0'}}
                            >Register
                            </button>
                            <button type="button"
                                    onClick={this.props.closeRegister}
                                    className="green-button"
                            >Cancel
                            </button>
                        </div>
                    </form>
                        <div>
                            <p style={{
                                fontSize: '.7em',
                                display: 'inline-block',
                                marginTop: '20px'
                            }}>Already have an account?
                            </p>
                            <a onClick={this.switchModal}
                               className="green-link"
                               style={{
                                   fontSize: '.7em',
                                   display: 'inline-block',
                                   marginLeft: '5px'
                               }}>Login
                            </a>
                        </div>
                    </div>
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