import React, { Component } from 'react'
import { connect } from 'react-redux'
import './LoginPanel.css'
import Login from './Login'
import Register from './Register'

class LoginPanel extends Component{

    renderCheck() {
        if(this.props.teacher.openLogin){
            return <Login openLogin={this.props.openLogin}
                          closeLogin={this.props.closeLogin}
                          openRegister={this.props.openRegister}
                          loginState={this.props.teacher.openLogin}/>
        }else if(this.props.teacher.openRegister){
            return <Register openRegister={this.props.openRegister}
                             closeRegister={this.props.closeRegister}
                             openLogin={this.props.openLogin}
                             registerState={this.props.teacher.openRegister}/>
        }
    }

    render(){

        return(
            <div id="login-panel"
                 className="menu-panel">
                <button className="green-button"
                        onClick={this.props.openLogin}>
                    Login
                </button>
                <button className="green-button"
                        onClick={this.props.openRegister}>
                    Sign Up
                </button>
                {this.renderCheck()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    teacher: state.teacherReducer
})

const mapDispatchToProps = (dispatch) => {
    return{
        openRegister:() => {
            const action = {type: 'OPEN_REGISTER'}
            dispatch(action)
        },
        closeRegister:() => {
            const action = {type: 'CLOSE_REGISTER'}
            dispatch(action)
        },
        openLogin:() => {
            const action = {type: 'OPEN_LOGIN'}
            dispatch(action)
        },
        closeLogin:() => {
            const action = {type: 'CLOSE_LOGIN'}
            dispatch(action)
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPanel)