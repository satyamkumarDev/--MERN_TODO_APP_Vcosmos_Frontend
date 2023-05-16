import Axios from 'axios';
import { TASK_CREATE_FAIL, TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_DETAILS_FAIL, TASK_DETAILS_REQUEST, TASK_DETAILS_SUCCESS, TASK_LIST_REQUEST, TASK_LIST_FAIL, TASK_LIST_SUCCESS, TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_FAIL, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_UPDATE_FAIL } from "../constants/taskConstants.js"

export const createTask=(task)=>async (dispatch, getState)=>{
    dispatch({type: TASK_CREATE_REQUEST, payload:task});
    try{

        const {userSignin:{userInfo}}=getState();
        const {data}= await Axios.post('/api/tasks/task/add', task,{
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        });
        dispatch({type: TASK_CREATE_SUCCESS, payload:data.task});
    }catch(error){
        dispatch({type: TASK_CREATE_FAIL,
        payload: error.response && error.response.data.message?error.response.data.message: error.message})
    }
}


export const detailsTask= (taskId)=>async (dispatch,getState)=>{
    dispatch({type:TASK_DETAILS_REQUEST, payload:taskId});
    const {userSignin:{userInfo}}=getState();
    try{

        const {data}=await Axios.get(`/api/tasks/details/${taskId.id}`, {
            headers:{Authorization:`Bearer ${userInfo.token}`},
        })

        dispatch({type:TASK_DETAILS_SUCCESS,payload:data})

    }catch(error){
        dispatch({type: TASK_DETAILS_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message: error.message})
    }
}

export const deleteTask= (taskId)=>async (dispatch,getState)=>{
    dispatch({type:TASK_DELETE_REQUEST, payload:taskId});
    const {userSignin:{userInfo}}=getState();
    try{

        const {data}=await Axios.delete(`/api/tasks/delete/${taskId._id}`, {
            headers:{Authorization:`Bearer ${userInfo.token}`},
        })

        dispatch({type:TASK_DELETE_SUCCESS,payload:data})

    }catch(error){
        dispatch({type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message: error.message})
    }
}

export const updateTask= (taskId)=>async (dispatch,getState)=>{
    dispatch({type:TASK_UPDATE_REQUEST, payload:taskId});
    const {userSignin:{userInfo}}=getState();
    try{

        const {data}=await Axios.put(`/api/tasks/task/update`, taskId,{
            headers:{Authorization:`Bearer ${userInfo.token}`},
        })

        dispatch({type:TASK_UPDATE_SUCCESS,payload:data})

    }catch(error){
        dispatch({type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message: error.message})
    }
}


export const getTaskList=()=>async (dispatch, getState)=>{
    dispatch({type:TASK_LIST_REQUEST});
    const {userSignin:{userInfo}}=getState();
    try{
        const {data}=await Axios.get('/api/tasks/task/get', {
            headers:{
                Authorization:`Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: TASK_LIST_SUCCESS, payload:data});
    }catch(error){
        dispatch({type:TASK_LIST_FAIL, payload: error.response && error.response.data.message?error.response.data.message: error.message})

    }
}




