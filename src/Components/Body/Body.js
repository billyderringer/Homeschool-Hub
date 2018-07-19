import React, { Component } from 'react'
import { connect } from 'react-redux'
import Splash from './Splash'
import Dashboard from "./Dashboard/Dashboard";

class Body extends Component{
    render(){
        return(
            <React.Fragment>
                { this.props.teacher.isLoggedIn ?
                     <Dashboard /> : <Splash />}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    teacher: state.teacherReducer
})

export default connect(mapStateToProps)(Body)