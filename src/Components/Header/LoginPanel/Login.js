import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import TeacherAPI from '../../../Data/API/teacher'

const teacherApi = new TeacherAPI()

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.switchModal = this.switchModal.bind(this)
        this.loginTeacher = this.loginTeacher.bind(this)
        this.setTeacherId = this.setTeacherId.bind(this)
        this.setTeacherData = this.setTeacherData.bind(this)
        this.setTeacherFullData = this.setTeacherFullData.bind(this)
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

    //api stuff
    loginTeacher(){
        localStorage.removeItem('token')
        localStorage.removeItem('teacherId')

        const {
            email,
            password
        } = this.state;

        const loginUser = {
            email,
            password
        }

        teacherApi.loginTeacher(loginUser, this.setTeacherId)

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })

        this.props.closeLogin()
    }

    setTeacherId(token){
        teacherApi.getTeacherId(token, this.setTeacherData)
    }

    setTeacherData(){
        teacherApi.getTeacherFullInfo(this.setTeacherFullData)
    }

    setTeacherFullData(teacher){
        this.props.setTeacherFullData(teacher)
    }



    render(){
        return(
            <div id="container-login"
                 className="center-all-flex">
                <Modal isOpen={this.props.loginState}
                       onRequestClose={this.closeLogin}
                       ariaHideApp={false}
                       contentLabel="Sign In Modal"
                       style={this.props.styles}>
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
                                   name="email"
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
        },
        setTeacherFullData:(teacher) => {
            const action = {type: 'SET_TEACHER_DATA', teacher}
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps) (Login)