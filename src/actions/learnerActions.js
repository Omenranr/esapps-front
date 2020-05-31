import axios from 'axios'
import { returnErrors } from "./errorActions"
import { formUser } from "./utilFunctions";
import { history } from "../history";
import {
    LEARNER_ADD_SUCCESS,
    DELETE_SUCCES,
    MODIFY_SUCCESS,
    LEARNER_ADD_FAIL,
    DELETE_FAIL,
    MODIFY_FAIL
} from "./types";

// firstName: {type: String, required: true},
// lastName: {type: String, required: true},
// gender: { type: String, required: true},
// birthday: {type: Date,required: true},
// mentalAge: {type: Number,required: true},
// parentEmail: {type: String, required: true},
// createdAt: {type: Date, default: Date.now},
// idTutor: {type: mongoose.Schema.Types.ObjectId, ref: 'campanions', required: true},
// organizations: [{type:mongoose.Schema.Types.ObjectId, ref: 'organizations', required: true}]

const formLearner = (learner) => {
    return {
        ...learner,
    }
}

export const addLearner = (learner, org_id) => (dispatch, getState) => {
    //TUTORS ADDING
    let user = formLearner(learner, "learner")
    console.log("add learner action")
    user['organizations'] = org_id
    console.log("final user", user)
    const body = JSON.stringify(user)
    axios.post('http://localhost:4000/api/learner/addLearner', body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LEARNER_ADD_SUCCESS,
                payload: res.data
            })
        }) 
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LEARNER_ADD_FAIL'))
            dispatch({
                type: LEARNER_ADD_FAIL
            })
        })
}

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
