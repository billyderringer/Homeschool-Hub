import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import SideMenu from './SideMenu'
import DashboardContent from './DashboardContent'

class Dashboard extends Component{

    render(){
        const {teacher} = this.props
        return(
            <div>
                {teacher !== {} ?
                    <div className="container-dashboard center-all-flex">
                        <SideMenu teacher={this.props.teacher}
                                  modal={this.props.modal} />
                        <DashboardContent teacher={this.props.teacher}
                                          modal={this.props.modal} />
                    </div> :
                    <div className="center-all-flex">
                        Loading...
                    </div>
                }
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        modal: state.styleReducer.modal,
        teacher: state.teacherReducer.currentTeacher
    }
}

export default connect(mapStateToProps) (Dashboard)