const initialState = {
    currentTeacher: {},
    isLoggedIn: false,
    openLogin: false,
    openRegister: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'REGISTER_TEACHER':
            return {
                ...state
            }
        case 'SET_TEACHER_ID':
            return {
                ...state,
                teacherId: action.teacherId.data.id,
                isLoggedIn: !state.isLoggedIn
            }
        case 'SET_TEACHER_DATA':
            return {
                currentTeacher: action.teacher.data,
                isLoggedIn: true
            }
        case 'LOGOUT_TEACHER':
            localStorage.removeItem('token')
            localStorage.removeItem('teacherId')
            return {
                isLoggedIn: !state.isLoggedIn,
                openLogin: false,
                openRegister: false
            }
        case 'OPEN_REGISTER':
            return {
                ...state,
                openRegister: true
            }
        case 'CLOSE_REGISTER':
            return {
                ...state,
                openRegister: false
            }
        case 'OPEN_LOGIN':
            return {
                ...state,
                openLogin: true
            }
        case 'CLOSE_LOGIN':
            return {
                ...state,
                openLogin: false
            }
        default:
            return state
    }
}

export default reducer