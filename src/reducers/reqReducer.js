import { 
    REQ_LOAD_FAIL,
    REQ_LOADING,
    REQ_LOADED
    } from '../actions/types'

const initialState = {
    requests: [],
    isLoading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REQ_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case REQ_LOADED: 
            return {
                requests: action.payload,
                isLoading: false,
            }
        case REQ_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}