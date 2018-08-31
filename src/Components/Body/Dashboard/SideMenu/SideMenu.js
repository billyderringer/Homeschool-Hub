import React, { Component } from 'react'
import { connect } from 'react-redux'
import './SideMenu.css'
import texture from '../../../../Assets/black-linen.png'
import Term from './Term'

class SideMenu extends Component{


    render(){
        const {teacher} = this.props
        const profile = teacher.avatar !== undefined ?
            teacher.avatar : "default-profile.png"
        return(
            <div id="side-menu"
                 style={{backgroundImage: 'url("'+ texture + '")'}}>
                <div id="profile-header" className="center-all-flex">
                    <img src={require('../../../../Assets/' + profile)} alt="profile"/>
                    <h2>{teacher.firstName} {teacher.lastName}</h2>
                </div>
                <Term />

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        style: state.styleReducer,
        teacher: state.teacherReducer.currentTeacher
    }
}

export default connect(mapStateToProps) (SideMenu)