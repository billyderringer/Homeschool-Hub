import React, { Component } from 'react'
import './NotifPanel.css'
import Logout from "./Logout.js"
import texture from "../../../Assets/black-linen.png"

class NotifPanel extends Component{
    render(){
        return(
            <div id="menu-panel"
                 className="center-all-flex"
                 style={{backgroundImage: 'url("'+ texture + '")'}}>
                <Logout />
            </div>
        )
    }
}

export default NotifPanel