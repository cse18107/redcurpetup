import React, { useState, useEffect } from "react";
import "./Home.css";
import Delete from "../../image/delete.png";
import Edit from "../../image/pencil.png";
import Overlay from "../../component/Overlay/Overlay.js";
import CreateTask from "../../component/CreateTask/CreateTask.js";
import UpdateTask from "../../component/UpdateTask/UpdateTask.js";
import LogoutModel from "../../component/LogoutModel/LogoutModel.js";
import { useDispatch, useSelector } from "react-redux";
import { loadTask, updateTask } from "../../actions/taskActions";
import Logout from "../../image/logout.png";
import { logout } from "../../actions/userActions";
import { useNavigate } from "react-router-dom";
import Check from "../../image/check.png";
import { deleteTask } from "../../actions/taskActions";

const Home = () => {
  const [show, setShow] = useState(false);
  const [create, setCreate] = useState(0);
  const [editTask, setEditTask] = useState({});
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const { task, isLoading } = useSelector((state) => state.task);
  console.log(task?.tasks);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("loadTask");

    dispatch(loadTask());
  }, []);

  const logoutHandler = () => {
    console.log(task);
    navigate("/login");
    dispatch(logout());
  };

  const checkHandler = (id) => {
    setChecked(true);
    dispatch(updateTask({ id, task: { complete: true } }));
  };

  const Loading = () => {
    return (
      <h1
        style={{
          fontFamily: `"Proxima Nova Regular", "Helvetica Neue", Helvetica, Arial, sans-serif`,
        }}
      >
        Loading...
      </h1>
    );
  };

  return (
    <>
      <div className="home_body">
        <button
          className="home_logout_button"
          onClick={() => {
            setShow(!show);
            setCreate(3);
          }}
        >
          <img src={Logout} alt="logout" style={{ width: "30px" }} />
        </button>
        <button
          className="home_add_button"
          onClick={() => {
            setShow(!show);
            setCreate(1);
          }}
        >
          +
        </button>
        <div className="home_content">
          {isLoading ? (
            <Loading />
          ) : (
            task &&
            task?.tasks?.map((task) => {
              return (
                <div className="home_content_item">
                  <div className="home_content_item_container">
                    <div className="home_content_item_content">
                      <div className="home_content_item_header">
                        <div
                          className="check_box"
                          style={{
                            border: `${
                              task.complete
                                ? " 1px solid rgba(4, 255, 0, 0.479)"
                                : " 1px solid rgba(255, 0, 0, 0.479)"
                            }`,
                            backgroundColor: `${
                              task.complete
                                ? "rgba(134, 255, 94, 0.096)"
                                : "rgba(255, 94, 94, 0.096)"
                            }`,
                          }}
                          onClick={() => checkHandler(task._id)}
                        >
                          {task.complete && <img src={Check} alt="check" />}
                        </div>
                        <div className="task_name">
                          {task.task.length > 8
                            ? `${task.task.slice(0, 8)}...`
                            : task.task}
                        </div>
                        <div className="task_icons">
                          <img
                            src={Edit}
                            alt="edit"
                            className="task_edit"
                            onClick={() => {
                              setShow(!show);
                              setCreate(2);
                              setEditTask(task);
                            }}
                          />
                          <img
                            src={Delete}
                            alt="delete"
                            className="task_delete"
                            onClick={() =>
                              dispatch(deleteTask({ id: task._id }))
                            }
                          />
                        </div>
                      </div>
                      <div className="home_content_item_description">
                        {task.description}
                      </div>
                      <div className="home_content_item_date">
                        {new Date(task.date).toDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {show && (
          <Overlay setShow={setShow} show={show}>
            {create === 1 && <CreateTask setShow={setShow} show={show} />}
            {create === 2 && (
              <UpdateTask task={editTask} setShow={setShow} show={show} />
            )}
            {create === 3 && <LogoutModel logoutHandler={logoutHandler} setShow={setShow} show={show} />}
          </Overlay>
        )}
      </div>
    </>
  );
};

export default Home;
