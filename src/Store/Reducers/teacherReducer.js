const initialState = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    teacherId: '',
    isLoggedIn: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REGISTER_TEACHER':
            return {
                firstName: action.firstName,
                lastName: action.lastName,
                userName: action.userName,
                password: action.password,
                teacherId: action.teacherId,
                isLoggedIn: true
            }
        case 'SET_TEACHER_ID':
            return {
                ...state,
                teacherId: action.teacherId
            }
        default:
            return state
    }
}

export default reducer