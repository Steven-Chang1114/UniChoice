import {combineReducers} from "redux"
import uniReducers from "./uniReducers"

export default combineReducers({
    term: uniReducers
})