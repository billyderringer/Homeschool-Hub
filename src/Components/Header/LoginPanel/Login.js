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
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('teacherId')

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
        //teacherApi.getTeacherFullInfo(this.setTeacherData)
    }

    setTeacherId(id){
        teacherApi.getTeacherId(id, this.setTeacherData)
    }

    setTeacherData(teacher){
        this.props.setTeacherId(teacher)
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
        loadTeacherData:(teacher) => {
            const action = {type: 'LOAD_TEACHER', teacher}
            dispatch(action)
        }
    }
}

export default connect(null, mapDispatchToProps) (Login)