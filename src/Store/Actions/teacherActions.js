import constants from './constants'
import axios from "axios/index";

const actions = {

    //teacher actions
    registerTeacher:(user) => {
        return {type: constants.REGISTER_TEACHER, user}
    },
    setTeacherId:(teacherId) => {
        return {type: constants.GET_TEACHER_ID, teacherId}
    },
    loadTeacherData:(teacher) => {
        return {type: constants.GET_TEACHER_ID, teacher}
    },
    logoutTeacher:() => {
        return {type: constants.LOGOUT_TEACHER}
    },

    //modal actions
    openRegister:() => {
        return {type: constants.OPEN_REGISTER}
    },
    closeRegister:() => {
        return {type: constants.CLOSE_REGISTER}
    },
    openLogin:() => {
        return {type: constants.OPEN_LOGIN}
    },
    closeLogin:() => {
        return {type: constants.CLOSE_LOGIN}
    }
}

export default actions