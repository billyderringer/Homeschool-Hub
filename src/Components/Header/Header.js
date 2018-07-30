import React, { Component } from 'react'
import {connect} from "react-redux"
import LoginPanel from './LoginPanel'
import NotifPanel from './NotifPanel'
import './Header.css'

class Header extends Component{
    render(){
        return(
            <nav id="container-header">
                <div id="header-brand"
                     className="center-all-flex">
                    <img src={require("../../Assets/hsh-logo/hsh-logo-wht-60x60.png")}
                         alt="homeschool hub logo"
                    />
                    <h2>Homeschool Hub</h2>
                </div>
                {this.props.teacher.isLoggedIn ?
                    <NotifPanel /> : <LoginPanel />}
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    teacher: state.teacherReducer
})

export default connect(mapStateToProps)(Header)