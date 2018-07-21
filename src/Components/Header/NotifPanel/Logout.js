import React, { Component } from 'react'
import { connect } from 'react-redux'

class Logout extends Component{
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }


    logout(){
        this.props.logoutTeacher()
    }
    render(){
        return(
            <React.Fragment>
                <button className="menu-link"
                        onClick={this.logout}>
                    Logout
                </button>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        logoutTeacher:() => {
            const action = {type: 'LOGOUT_TEACHER'}
            dispatch(action)
        }
    }
}

export default connect (null, mapDispatchToProps) (Logout)