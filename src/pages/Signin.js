import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../component/LoadingBox';
import MessageBox from '../component/MessageBox';

export default function Signin(props){
    const [email, setEmail]=useState(' ');
    const [password, setPassword]=useState(' ');
    const navigate = useNavigate();

    const dispatch=useDispatch();
    const userSignin=useSelector(state=>state.userSignin);
    const {userInfo, loading, error}=userSignin;
    const submitHandler=(e)=>{
        e.preventDefault();
        if(!email.trim() || !password.trim()){
            alert('email Or password is missing')
        }else{
            dispatch(signin(email,password));
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
                        Sign In
                    </h1>

                </div>
                {loading && <LoadingBox></LoadingBox>  }
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email"  onChange={e=>setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password"> Password</label>
                    <input type="password" id="password" placeholder="Enter Password"  onChange={e=>setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button type="submit" className="primary" > Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        New User? {' '}
                        <Link to={`/register`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}