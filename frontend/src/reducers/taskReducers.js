import { CREATE_TASK_FAIL, CREATE_TASK_REQUEST, CREATE_TASK_SUCCESS, DELETE_TASK_FAIL, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, LOAD_TASK_FAIL, LOAD_TASK_REQUEST, LOAD_TASK_SUCCESS, UPDATE_TASK_FAIL, UPDATE_TASK_REQUEST, UPDATE_TASK_SUCCESS } from "../constants/taskConstants";

export const taskReducer = (state={task:[]},action) =>{
    switch(action.type) {
        case CREATE_TASK_REQUEST:
        case LOAD_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:
        case DELETE_TASK_REQUEST:
            return {
                isLoading:true
            };
        case CREATE_TASK_SUCCESS:
        case LOAD_TASK_SUCCESS:
        case UPDATE_TASK_SUCCESS:
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                isLoading:false,
                task:action.payload
            };
        case CREATE_TASK_FAIL:
        case LOAD_TASK_FAIL:
        case UPDATE_TASK_FAIL:
        case DELETE_TASK_FAIL:
            return {
                ...state,
                isLoading:false,
                task:null,
                error:action.payload
            };
        default: return state
    }
};


