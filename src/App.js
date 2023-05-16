import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import Task from './pages/Task';
import TaskList from './pages/TaskList';
import Register from './pages/Register';
import Signin from './pages/Signin';
import UpdateTask from './pages/UpdateTask';

function App() {

  const dispatch=useDispatch()
  
  const userSignin=useSelector(state=>state.userSignin);
  const {userInfo}=userSignin;

  const signoutHandler=()=>{
    dispatch(signout())
  }

  return (
    <Router>
    <div className="grid-container">
    <header className="row">
        <div>
            <Link className="brand" to="/">TODO</Link>
        </div>
        <div>
            {
              userInfo ? (
                <div className='row'>
                <div className="dropdown">
                <Link to="#">hello, {userInfo.userName}<i style={{padding:'3px'}} className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <li><Link to="/signin" onClick={signoutHandler}> Sign out</Link></li>
                  </ul>
                  </div>
                </div>
              ) : (
                <Link to="/signin">Sign In</Link>
               
              )
            }
        </div>
    </header>
    <main>
    <Routes>

      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/task-list/:id" element={userInfo ? <UpdateTask /> : <Navigate to={`/signin`} />}></Route>
      <Route path="/task-list" element={userInfo ? <TaskList /> : <Navigate to={`/signin`} />}></Route>
      <Route path="/create-task" element={userInfo ? <Task /> : <Navigate to={`/signin`} />}></Route>
      <Route path="/" element={<Navigate to={`/signin`} />} exact></Route>
      </Routes>
    </main>
    <footer className="row center">
        All right reserved
    </footer>
</div>
</Router>
  );
}

export default App;
