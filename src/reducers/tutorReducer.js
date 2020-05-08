import {
    ADD_SUCCESS,
    DELETE_SUCCES,
    MODIFY_SUCCESS,
    ADD_FAIL,
    DELETE_FAIL,
    MODIFY_FAIL
} from "../actions/types";

const initialState = {
    tutors: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_SUCCESS':
            return {
                ...state,
            }
        case 'ADD_FAIL':
    }
}