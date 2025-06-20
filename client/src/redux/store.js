import { createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { authReducer } from './reducers/authReducer';
import { jobReducer } from './reducers/jobReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    jobs: jobReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;