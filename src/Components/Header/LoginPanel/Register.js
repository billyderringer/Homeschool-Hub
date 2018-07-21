import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import TeacherAPI from '../../../Data/API/teacher'

const teacherApi = new TeacherAPI()

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
        this.switchModal = this.switchModal.bind(this)
        this.registeredLogin = this.registeredLogin.bind(this)
        this.setTeacherId = this.setTeacherId.bind(this)
        this.setTeacherFullData = this.setTeacherFullData.bind(this)
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
        this.props.openLogin()
        this.props.closeRegister()
    }

    //api stuff
    registerTeacher(){
        const {
            firstName,
            lastName,
            email,
            password
        } = this.state;

        const registerUser = {
            firstName,
            lastName,
            email,
            password
        }

        const loginUser = {
            email,
            password
        }

        teacherApi.registerTeacher(registerUser,loginUser, this.registeredLogin)

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })

        this.props.closeRegister()
    }

    registeredLogin(loginUser){
        teacherApi.loginTeacher(loginUser, this.setTeacherId)
    }

    setTeacherId(id){
        teacherApi.getTeacherId(id, this.setTeacherFullData)
    }

    setTeacherFullData(teacher){
        this.props.setTeacherFullData(teacher)
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
                       style={this.props.styles}>
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
                               name="email"
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
        },
        setTeacherId:(teacherId) => {
            const action = {type: 'SET_TEACHER_ID', teacherId}
            dispatch(action)
        },
        setTeacherFullData:(teacher) => {
            const action = {type: 'SET_TEACHER_DATA', teacher}
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps) (Register)