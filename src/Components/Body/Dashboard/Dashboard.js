import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import TeacherAPI from '../../../Data/API/teacher'

const teacherApi = new TeacherAPI()

class Dashboard extends Component{

    componentWillMount(){
        teacherApi.getTeacherFullInfo(this.props.loadTeacherFullData)
    }

    render(){
        const teacher = this.props.teacher
        const checkRender =
            teacher !== undefined ?
                <h1>Hello {teacher.firstName}</h1>:
                <h1>Loading</h1>

        return(
            <div className="container-dashboard center-all-flex">
                {checkRender}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return{
        teacher: state.teacherReducer.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loadTeacherFullData:(teacher) => {
            const action = {type: 'LOAD_TEACHER_DATA', teacher}
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)