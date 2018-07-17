import React, { Component } from 'react'
import './LoginPanel.css'

class LoginPanel extends Component{
    render(){
        return(
            <div id="login-panel"
                 className="menu-panel">
                <button className="green-button"
                >Login
                </button>
                <button className="green-button"
                >Sign Up
                </button>
            </div>
        )
    }
}

export default LoginPanel