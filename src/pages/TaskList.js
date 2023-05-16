import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { deleteTask, getTaskList } from "../actions/taskActions";
export default function TaskList(props) {
  const dispatch = useDispatch();
  const taskList = useSelector((state) => state.taskList);
  const { loading, error, tasks } = taskList;

  const handleDelete = (data) => {
    dispatch(deleteTask(data));
    getList();
  };


  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    dispatch(getTaskList());
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-1"></div>
            <div className="col-1">
              {tasks &&
                tasks.map((data, index) => {
                  return (
                    <div className="card card-body">
                      <div className="card-header">
                        <div style={{ float: "left", padding:'10px 10px' }}>{data.title}</div>
                        <div style={{ float: "right", padding: '10px 10px' }}>
                          <i
                            class="fa fa-trash fa-md"
                            onClick={() => handleDelete(data)}
                            aria-hidden="true"
                            style={{ color: "#E92732" }}
                          ></i>
                        </div>
                        <div style={{ float: "right", padding: '10px 10px'}}>
                            <Link to={`/task-list/${data._id}`}>
                            <i
                            class="fa fa-edit fa-md"
                            aria-hidden="true"
                            style={{ color: "#203040" }}
                          ></i>
                            </Link>
                        </div>
                      </div>
                      <div className="content-body" >
                        <p>
                        {data.description}
                        </p>
                    </div>
                    </div>
                  );
                })}
            </div>

            <div className="col-1"></div>
          </div>
        </div>
      )}
    </div>
  );
}
