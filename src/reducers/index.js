import {combineReducers} from 'redux'
import errorReducer from './errorReducer'
import authReducer from './authReducer'
import tutorReducer from "./tutorReducer"
import learnerReducer from "./learnerReducer"
import appReducer from "./appReducer"
import orgReducer from "./orgReducer"
import reqReducer from "./reqReducer"

export default combineReducers({
    error : errorReducer,
    auth : authReducer,
    tutor: tutorReducer,
    learner: learnerReducer,
    app: appReducer,
    org: orgReducer,
    req: reqReducer
})