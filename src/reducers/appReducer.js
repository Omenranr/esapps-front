import { 
    APP_LOAD_FAIL,
    APP_LOADING,
    APP_LOAD_SUCCESS
    } from '../actions/types'

const initialState = {
    apps: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case APP_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case APP_LOAD_SUCCESS: 
            return {
                apps: action.payload,
                isLoading: false,
            }
        case APP_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}