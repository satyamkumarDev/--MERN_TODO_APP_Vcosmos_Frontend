import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { createTask } from '../actions/taskActions';
import {Link, useNavigate} from 'react-router-dom';


export default function Task(props){
    const navigate = useNavigate();
    const [title, setTitle]=useState(' ');
    const [description, setDescription]=useState(' ');
    const dispatch=useDispatch();
    const createTasks=useSelector(state=>state.createTask);
    const {userInfo, loading, error}=createTasks;
    
    const submitHandler=(e)=>{
        e.preventDefault();
        if(!title.trim() || !description.trim()){
            alert('Either Title Or Descriptions are missing')
        }else{
            dispatch(createTask({title:title, description: description}));
            navigate('/task-list');
        }
    }

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div >
                    <h1>
                       Create Task
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>  }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Title</label>
                    <input type="text" id="title" placeholder="Enter Title" required onChange={e=>setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Descriptions</label>
                    <textarea rows="6" cols="50" type="email" id="email" placeholder="Enter Email" required onChange={e=>setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary" > Create Task</button>
                </div>
            </form>
        </div>
    )
}