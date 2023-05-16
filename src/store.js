import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { userDetailsReducer, userRegisterReducer, userSigninReducer } from './reducers/userReducers';
import { TaskCreateReducer, TaskDetailsReducer, deleteTaskReducer, getTaskListReducer, updateTaskReducer } from './reducers/taskReducers';

const initialState={
    userSignin:{
        userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null,
    }
};
const reducer=combineReducers({
    userRegister:userRegisterReducer,
    userSignin: userSigninReducer,
    userDetails:userDetailsReducer,
    createTask:TaskCreateReducer,
    taskDetails:TaskDetailsReducer,
    taskList:getTaskListReducer,
    deleteTask:deleteTaskReducer,
    updateTask: updateTaskReducer
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;