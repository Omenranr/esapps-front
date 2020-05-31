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