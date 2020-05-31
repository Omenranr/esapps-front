import {
    LEARNER_ADD_SUCCESS,
    DELETE_SUCCES,
    MODIFY_SUCCESS,
    LEARNER_ADD_FAIL,
    DELETE_FAIL,
    MODIFY_FAIL
} from "../actions/types";

const initialState = {
    learners: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LEARNER_ADD_SUCCESS':
            return {
                learners: [...state.learners, action.payload.data]
            }
        case 'LEARNER_ADD_FAIL':
            return {
                ...state,
            }
        default:
            return state
    }
}