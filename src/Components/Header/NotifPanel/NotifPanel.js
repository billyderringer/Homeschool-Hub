import React, { Component } from 'react'
import './NotifPanel.css'
import Logout from "./Logout";

class NotifPanel extends Component{
    render(){
        return(
            <div className="menu-panel">
                <Logout />
            </div>
        )
    }
}

export default NotifPanel