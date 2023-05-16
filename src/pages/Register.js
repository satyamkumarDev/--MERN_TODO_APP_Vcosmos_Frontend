import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function Register(props){
    const navigate = useNavigate();
    const [userName, setUserName]=useState(' ');
    const [email, setEmail]=useState(' ');
    const [password, setPassword]=useState(' ');
    const [cpassword, setConfirmpassword]=useState(' ');


    const dispatch=useDispatch();
    const userRegister=useSelector(state=>state.userRegister);
    const {userInfo, loading, error}=userRegister;

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password !== cpassword){
            alert('Password and Confirm Password are not match')
        }else if(!userName.trim() || !email.trim()){
            alert('User name Or email is missing')
        }else{
            dispatch(register(userName,email,password));
        } 
    }

    useEffect(()=>{
        if(userInfo){
            navigate('/create-task');
        }
    }, [userInfo])

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div >
                    <h1>
                       Register
                    </h1>

                </div>
                {loading && <LoadingBox></LoadingBox>  }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Name"  onChange={e=>setUserName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email"  onChange={e=>setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id="password" placeholder="Enter Password"  onChange={e=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" id="cpassword" placeholder="Enter confirm Password"  onChange={e=>setConfirmpassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary" > Register</button>
                </div>
                <div>
                    <label />
                    <div>
                       Already have an account? {' '}
                        <Link to={`/signin`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}