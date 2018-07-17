import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-modal'

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
        this.switchModal = this.switchModal.bind(this)
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

    switchModal(){
        this.props.closeLogin()
        this.props.openRegister()
    }

    //api calls
    loginTeacher(){
        axios.post('http://localhost:3008/api/v1/teacher/login', {
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
                <Modal isOpen={this.props.loginState}
                       onRequestClose={this.closeLogin}
                       ariaHideApp={false}
                       contentLabel="Sign In Modal"
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
                               backgroundColor: 'rgba(0,0,0,.8)',
                               color: 'rgba(255,255,255,.8)'
                           }
                       }}>
                    <div id="modal-login"
                         className="modal-container"
                         style={{textAlign: 'center'}}>
                        <h2 style={{marginBottom: '20px'}}>
                            LOGIN
                        </h2>
                        <img src={require("../../../Assets/hsh-logo/hsh-logo-grn-60x60.png")}
                             alt="homeschool hub logo" />
                        <p style={{margin: '20px 0 40px'}}
                        >Welcome to Homeschool Hub!
                        </p>
                        <form className="flex-form"
                              id="login-form"
                              onSubmit={this.handleSubmit}>
                            <input id="username-login"
                                   name="username"
                                   onChange={this.handleChange}
                                   type="email"
                                   placeholder="Email"
                                   required
                                   style={{
                                       padding: '5px',
                                       color: '#fff',
                                       backgroundColor: 'rgba(255,255,255,.1)'
                                   }}/>
                            <input id="password-login"
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
                                >Login
                                </button>
                                <button type="button"
                                        onClick={this.props.closeLogin}
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
                            }}
                            >New to Homeschool Hub?
                            </p>
                            <a onClick={this.switchModal}
                               className="green-link"
                               style={{
                                   fontSize: '.7em',
                                   display: 'inline-block',
                                   marginLeft: '5px'
                               }}
                            >Sign Up
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
        setTeacherId:(teacherId) => {
            const action = {type: 'SET_TEACHER_ID', teacherId}
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps) (Login)