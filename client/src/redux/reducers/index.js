import { combineReducers } from "redux";
import userDataReducer from "./userWishes";

const rootReducer = combineReducers({
	userData: userDataReducer,
});

export default rootReducer;
