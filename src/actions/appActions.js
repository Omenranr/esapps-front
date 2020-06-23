import axios from 'axios'
import { returnErrors } from "./errorActions"
import {
    APP_LOADING,
    APP_LOAD_FAIL,
    APP_LOAD_SUCCESS
} from './types'

//CHECK TOKEN AND LOAD USER
export const loadApps = () => (dispatch, getState) => {
    //USER LOADING
    dispatch({ type: APP_LOADING })
    axios.get('http://localhost:4000/api/application/getApps', tokenConfig(getState))
        .then(res => {
            console.log("apps result", res.data)
            dispatch({
                type: APP_LOAD_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            console.log("app load error", err)
            returnErrors(err.response.data, err.response.status)
            dispatch({
                type: APP_LOAD_FAIL,
            })
        })
}

export const sendRequest = (learners, user, appDemanded) => (dispatch, getState) => {
    const body = JSON.stringify({
        learners: learners,
        appRequested: appDemanded,
        user: user,
        organization: user.organizations[0],
    })
    console.log("send app request from appActions", body)
    axios.post('http://localhost:4000/api/application/sendRequest', body, tokenConfig(getState))
    .then(res => {
        console.log("res from app request", res)
    })
    .catch(err => {
        console.log("error from app request", err)
    })
}

export const sendParentRequest = (values, parent, appDemanded) => (dispatch, getState) => {
    console.log("sendrequestparent")
    const body = JSON.stringify({
        ...values,
        appRequested: appDemanded,
        type: 'parent',
        parent: parent
    })
    axios.post('http://localhost:4000/api/application/sendParentRequest', body, tokenConfig(getState))
    .then(res => {
        console.log("res from parent app request", res)
    })
    .catch(err => {
        console.log("error from parent app request", err)
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