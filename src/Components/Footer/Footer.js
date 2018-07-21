import React, { Component } from 'react'
import './Footer.css'
import texture from "../../Assets/black-linen.png"

class Footer extends Component{
    render(){
        return(
            <div id="container-footer"
                 className="center-all-flex"
                 style={{backgroundImage: 'url("'+ texture + '")'}}>
                <h3>© 2018 Homeschool Hub</h3>
            </div>
        )
    }
}

export default Footer