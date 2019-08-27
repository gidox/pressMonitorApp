
import {combineReducers} from 'redux';
import authenticate from "./authenticate";
import user from "./user";


const rootReducer = combineReducers({
authenticate,
user
});

export default rootReducer;
