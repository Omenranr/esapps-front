import axios from 'axios'
import { returnErrors } from "./errorActions"
import { history } from "../history";
import {
    REQ_LOADED,
    REQ_LOADING,
    REQ_LOAD_FAIL,
} from './types'

export const loadReqs = () => (dispatch, getState) => {
    dispatch({ type: REQ_LOADING })
    axios.get('http://localhost:4000/api/request/selectAll', tokenConfig(getState))
        .then(response => {
            console.log("organizations returned from back end", response.data)
            dispatch({
                type: REQ_LOADED,
                payload: response.data
            })
        })
        .catch(err => {
            dispatch({ type: REQ_LOAD_FAIL })
            console.log(err)
        })
}

export const sendDecision = (decision, request, motif) => (dispatch, getState) => {
    console.log("entered send decision in frontend")
    const data = {
        application: request.application,
        organization: request.organization,
        learners: request.learners,
        decision: decision,
        request: {
            _id: request._id,
            status: request.status,
            type: request.type
        }
    }
    data.motif = motif === null ? null : motif
    const body = JSON.stringify(data)
    axios.post('http://localhost:4000/api/request/sendDecision', body, tokenConfig(getState))
    .then(response => {
        console.log(response.data)
    })
    .catch(err => {
        console.log(err)
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