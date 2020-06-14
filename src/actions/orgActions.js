import axios from 'axios'
import { returnErrors } from "./errorActions"
import { history } from "../history";
import {
    ORG_LOADED,
    ORG_LOADING,
    ORG_LOAD_FAIL,
} from './types'

export const loadOrgs = () => (dispatch, getState) => {
    dispatch({type: ORG_LOADING})
    axios.get('http://localhost:4000/api/organization/selectAll', tokenConfig(getState))
    .then(response => {
        console.log("organizations returned from back end", response.data)
        dispatch({
            type: ORG_LOADED,
            payload: response.data
        })
    })
    .catch(err => {
        dispatch({type: ORG_LOAD_FAIL})
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