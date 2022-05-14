import {
  LOAD_TASK_FAIL,
  LOAD_TASK_REQUEST,
  LOAD_TASK_SUCCESS,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_REQUEST,
  CREATE_TASK_FAIL,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAIL,
  UPDATE_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAIL,
} from "../constants/taskConstants";
import { baseURL } from "../utils/getBaseUrl";

export const loadTask = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_TASK_REQUEST });

    const token = localStorage.getItem("task-token");

    console.log(token);

    await fetch(`${baseURL}/api/task`, {
      method: "GET",
      headers: {
        token:`Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: LOAD_TASK_SUCCESS, payload: data.message });
      });
  } catch (error) {
    dispatch({ type: LOAD_TASK_FAIL, payload: error.message });
  }
};

export const createTask = (task) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TASK_REQUEST });

    const token = localStorage.getItem("task-token");

    await fetch(`${baseURL}/api/task`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        token:`Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: CREATE_TASK_SUCCESS, payload: data.message });
      });
  } catch (error) {
    dispatch({ type: CREATE_TASK_FAIL, payload: error.message });
  }
};

export const updateTask = ({id,task}) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_TASK_REQUEST });
    
        const token = localStorage.getItem("task-token");
    
        await fetch(`${baseURL}/api/task/${id}`, {
          method: "PUT",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
            token:`Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch({ type: UPDATE_TASK_SUCCESS, payload: data.message });
          });
      } catch (error) {
        dispatch({ type: UPDATE_TASK_FAIL, payload: error.message });
      }
};

export const deleteTask = ({id,task}) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_TASK_REQUEST });
    
        const token = localStorage.getItem("task-token");
    
        await fetch(`${baseURL}/api/task/${id}`, {
          method: "DELETE",
          body: JSON.stringify(task),
          headers: {
            "Content-Type": "application/json",
            token:`Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch({ type: DELETE_TASK_SUCCESS, payload: data.message });
          });
      } catch (error) {
        dispatch({ type: DELETE_TASK_FAIL, payload: error.message });
      }
};
