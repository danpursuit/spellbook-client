import { combineReducers } from "redux";

import auth from './auth';
import char from './char';
import games from "./games";
import locations from './locations';
import views from './views';
import notes from './notes';

export default combineReducers({
    auth,
    views,
    locations,
    char,
    notes,
    games,
})