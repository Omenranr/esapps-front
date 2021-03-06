import {
    TUTOR_ADD_SUCCESS,
    DELETE_SUCCES,
    MODIFY_SUCCESS,
    TUTOR_ADD_FAIL,
    DELETE_FAIL,
    MODIFY_FAIL
} from "../actions/types";

const initialState = {
    tutors: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'TUTOR_ADD_SUCCESS':
            return {
                tutors: [...state.tutors, action.payload.data]
            }
        case 'TUTOR_ADD_FAIL':
            return {
                ...state,
            }
        default:
            return state
    }
}