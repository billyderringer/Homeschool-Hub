import { apiURL } from '../data'
import axios from 'axios'


let token,
    teacherId

class TeacherAPI {

    //register new teacher & login teacher
    registerTeacher(registerUser, loginUser){
        axios(`${apiURL}/teacher/register`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(registerUser)
        })
            .then(() => {
                this.loginTeacher(loginUser)
            })
            .catch(err => {
                console.log(err);
            })
    }

    //login & set jwt to sessionStorage, then call setTeacherId()
    loginTeacher(loginUser){
        axios(`${apiURL}/teacher/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: JSON.stringify(loginUser)
        })
            .then (res => {
                res.setHeader(`Set-Cookie: token=${res.data.token}; Secure; HttpOnly`)
                token = res.data.token
                //sessionStorage.setItem('token', res.data.token)
            })
            .then(() => this.getTeacherId())
            .catch(err => {
                console.log(err);
            })
    }

    //gets teacher ObjectID
    getTeacherId(){
        axios({
            "url": `${apiURL}/teacher/me`,
            "method": "GET",
            "headers": {"Authorization": "Bearer " + token}
        })
            .then(res => {
                console.log(res)
                sessionStorage.setItem('teacherId', res.data.id)
            })
            .then(() =>  this.getTeacherFullInfo())
            .catch(err => {
                console.log(err)
            })
    }

    getTeacherFullInfo(cb){
        axios({
            "url": `${apiURL}/teacher/${sessionStorage.getItem('teacherId')}`,
            "method": "GET",
            "headers": {"Authorization": "Bearer " + sessionStorage.getItem('token')}
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    logoutTeacher(){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('teacherId')
    }

}

export default TeacherAPI