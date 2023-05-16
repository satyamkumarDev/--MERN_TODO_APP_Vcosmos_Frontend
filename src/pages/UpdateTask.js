import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';
import { createTask, detailsTask, updateTask } from '../actions/taskActions';
import {Link, useNavigate, useParams} from 'react-router-dom';


export default function UpdateTask(props){
    const taskDetails = useSelector(state=>state.taskDetails)
    const {task} = taskDetails
    const navigate = useNavigate();
    const params = useParams()
    const {id} = params
    const [title, setTitle]=    useState(' ')
    const [description, setDescription]=  useState(' ')

    const dispatch=useDispatch();
    const createTasks=useSelector(state=>state.createTask);
    const {userInfo, loading, error}=createTasks;
  
    
    
    const submitHandler=(e)=>{
        e.preventDefault();
        if(!title || !description){
            alert('Either Title Or Descriptions is missing')
        }else{
            let model = {}
            if(task.title === title){
                model.title = task.title
            }else{
                model.title = title
            }
            if(task.description === description){
                model.description = task.description
            }else{
                model.description = description
            }
            model._id=id
            dispatch(updateTask(model));
            navigate('/task-list');
        }
    }

    useEffect(() => {
        getTaskDetails();       
        if(!task){}else{
            setTitle(task.title)
            setDescription(task.description)
        }
      }, []);

      const getTaskDetails =()=>{
        dispatch(detailsTask({id:id}))
      }

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div >
                    <h1>
                       Update Task
                    </h1>
                </div>
                {loading && <LoadingBox></LoadingBox>  }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Title</label>
                    <input type="text" id="title" placeholder="Enter Title" value={title ? title : task.title} required onChange={e=>setTitle(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Descriptions</label>
                    <textarea rows="6" cols="50" type="email" id="email" placeholder="Enter Email"  value = {description ? description : task.description} required onChange={e=>setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary" > Update Task</button>
                </div>
            </form>
        </div>
    )
}