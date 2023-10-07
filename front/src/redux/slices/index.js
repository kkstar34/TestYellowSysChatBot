import { combineReducers } from "redux";
import sidebarReducer from "./sidebar";
import fileReducer from "./files";

const rootReducer = combineReducers({
   sidebar : sidebarReducer,
   files : fileReducer
})


export default rootReducer;