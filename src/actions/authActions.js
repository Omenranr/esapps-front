import axios from 'axios'
import { returnErrors } from "./errorActions"
import { formUser, constructOrg } from "./utilFunctions"
import { history } from "../history"
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    MODIFY_USER
} from './types'

//CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    //USER LOADING
    dispatch({ type: USER_LOADING })
    axios.get('http://localhost:4000/api/campanionAuth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            // returnErrors(err.response.data, err.response.status)
            dispatch({
                type: AUTH_ERROR,
            })
            history.push('/')
        })
}

export const orgRegister = (values) => dispatch => {
    console.log("orgregister", values)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify(constructOrg(values))
    axios.post('http://localhost:4000/api/campanionAuth/signupOrg', body, config)
    .then(res => {
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        history.push('/dashboard')
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
        dispatch({
            type: REGISTER_FAIL
        })
        
    })
}

export const register = (values) => dispatch => {
    console.log("normal register", values)
    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //REQUEST BODY
    const body = JSON.stringify(formUser(values))

    axios.post('http://localhost:4000/api/campanionAuth/signup', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

export const login = (user) => dispatch => {
    console.log(user)
    //HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    //REQUEST BODY
    const body = JSON.stringify(user)

    axios.post('http://localhost:4000/api/campanionAuth/login', body, config)
        .then(res => {
            console.log(res)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            console.log('finished dispatching')
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
            dispatch({
                type: LOGIN_FAIL,
            })
            console.log("login error", err)
        })
}

export const modifyUser = (values) => (dispatch, getState) => {

    const body = JSON.stringify(values)
    axios.post('http://localhost:4000/api/campanion/modifyUser', body, tokenConfig(getState))
    .then(result => {
        dispatch(
            {
                type: MODIFY_USER,
                payload: result.data
            }
        )
    })
}

export const modifyPassword = (values) => (dispatch, getState) => {
    const body = JSON.stringify(values)
    axios.post('http://localhost:4000/api/campanion/updatePassword', body, tokenConfig(getState))
    .then(result => {
        dispatch(
            {
                type: AUTH_ERROR
            }
        )
        history.push('/')
    })
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
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