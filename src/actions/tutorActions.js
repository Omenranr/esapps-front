import axios from 'axios'
import { returnErrors } from "./errorActions"
import { formUser } from "./utilFunctions";
import { history } from "../history";
import {
    TUTOR_ADD_SUCCESS,
    DELETE_SUCCES,
    MODIFY_SUCCESS,
    TUTOR_ADD_FAIL,
    DELETE_FAIL,
    MODIFY_FAIL
} from "./types";

export const addTutor = (tutor, org_id) => (dispatch, getState) => {
    //TUTORS ADDING
    let user = formUser(tutor, "tutor", org_id)
    console.log("add Tutor action")
    user['organizations'] = org_id
    console.log("final user", user)
    const body = JSON.stringify(user)
    axios.post('http://localhost:4000/api/campanionAuth/signup', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: TUTOR_ADD_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'ADD_FAIL'))
            dispatch({
                type: TUTOR_ADD_FAIL
            })
        })
}
// export const loadTutors = (org_id) => (dispatch, getState) => {
//     //TUTORS LOADING
//     dispatch({type: TUTORS_LOADING})
//     axios.get('http://localhost:4000/api/campanionRoute/getTutors?org_id='+org_id, tokenConfig(getState))
//     .then(res => {
//         dispatch({
//             type: TUTORS_LOADED,
//             payload: res.data
//         })
//     })
//     .catch(err => {
//         returnErrors(err.response.data, err.response.status)
//         dispatch({
//             type: TUTOR_LOAD_FAIL
//         })
//     })
// }

// SETUP CONFIG/HEADERS AND TOKEN
export const tokenConfig = getState => {
    //GET TOKEN FROM LOCALSTORAGE
    const token = getState().auth.token

    //HEADERS
    const config = {
        headers: {
            "Content-type": "application/json",
        }
    }
    //IF TOKEN THEN ADD TO HEADERS
    if (token) config.headers['x-auth-token'] = token

    return config
}