import React, { Component } from 'react'
import './LoginPanel.css'
import Login from './Login'
import Register from './Register'

class LoginPanel extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            openLogin: false,
            openRegister: false
        })

        this.openLogin = this.openLogin.bind(this)
        this.closeLogin = this.closeLogin.bind(this)
        this.openRegister = this.openRegister.bind(this)
        this.closeRegister = this.closeRegister.bind(this)
        this.renderCheck = this.renderCheck.bind(this)
    }

    //modal controls
    openLogin() {
        this.setState({openLogin: true});
    }

    closeLogin() {
        this.setState({openLogin: false});
    }

    openRegister() {
        this.setState({openRegister: true});
    }

    closeRegister() {
        this.setState({openRegister: false});
    }

    renderCheck() {
        if(this.state.openLogin){
            return <Login openLogin={this.openLogin}
                          closeLogin={this.closeLogin}
                          openRegister={this.openRegister}
                          loginState={this.state.openLogin}/>
        }else if(this.state.openRegister){
            return <Register openRegister={this.openRegister}
                             closeRegister={this.closeRegister}
                             openLogin={this.openLogin}
                             registerState={this.state.openRegister}/>
        }
    }

    render(){

        return(
            <div id="login-panel"
                 className="menu-panel">
                <button className="green-button"
                        onClick={this.openLogin}>
                    Login
                </button>
                <button className="green-button"
                        onClick={this.openRegister}>
                    Sign Up
                </button>
                {this.renderCheck()}
            </div>
        )
    }
}

export default LoginPanel