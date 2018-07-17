import constants from './constants'

const actions = {
    registerTeacher:(teacher) => {
        return {type: constants.REGISTER_TEACHER, teacher}
    },
    setTeacherId:(teacherId) => {
        return {type: constants.GET_TEACHER_ID, teacherId}
    }
}

export default actions