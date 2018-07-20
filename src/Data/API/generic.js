import { apiURL } from '../data'
import axios from 'axios'

class GenericApi{

    getElements(parentRoute, route, cb){
        axios({
            "url": `${apiURL}/${parentRoute}/${route}/${localStorage.getItem(route + 'Id')}`,
            "method": "GET",
            "headers": {"Authorization": "Bearer " + localStorage.getItem('token')}
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    getElement(route, cb){
        axios({
            "url": `${apiURL}/${route}/${localStorage.getItem(route + 'Id')}`,
            "method": "GET",
            "headers": {"Authorization": "Bearer " + localStorage.getItem('token')}
        })
            .then(res => {
                cb(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

}

export default GenericApi