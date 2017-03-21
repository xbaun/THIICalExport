import { combineReducers } from 'redux';

import auth from './reducers/auth.js';
import ical from './reducers/ical.js';

export default combineReducers({
    auth,
    ical
});