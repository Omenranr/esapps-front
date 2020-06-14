import { 
    ORG_LOAD_FAIL,
    ORG_LOADING,
    ORG_LOADED
    } from '../actions/types'

const initialState = {
    organizations: [],
    isLoading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ORG_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case ORG_LOADED: 
            return {
                organizations: action.payload,
                isLoading: false,
            }
        case ORG_LOAD_FAIL:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }
}