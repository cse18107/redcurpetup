import React,{useState} from "react";
import "./UpdateTask.css";
import { useDispatch,useSelector } from "react-redux";
import { loadTask, updateTask } from "../../actions/taskActions";


const UpdateTask = (props) => {
    const [show,setShow] = useState(props.show);
    const [name,setName] = useState(props.task.task);
    const [description,setDescription] = useState(props.task.description);
    const [date,setDate] = useState(props.task.date);
    const dispatch = useDispatch();

    console.log(props.task)

    const submitHandler = () => {
        dispatch(updateTask({id:props.task._id,task:{task:name,description,date}}));
        props.setShow(!show)
    }

  return (
    <div className="update_task_body">
      <div className="update_task_content">
          <h1 className="cross_sign" onClick={()=>{props.setShow(!show)}}>×</h1>
          <h1 className="update_task_heading">Update Task</h1>
        <input className="name_input" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder={"Enter name"} />
        <textarea
          className="description_input"
          placeholder={"Enter description"}
          value={description}
          onChange={(e)=>{setDescription(e.target.value)}}
        />
        <span className="datepicker-toggle">
          <span className="datepicker-toggle-button">{new Date(date).toDateString()}</span>
          <input type="date" className="datepicker-input" onChange={(e)=>{setDate(e.target.value)}} />
        </span>
        <button className="update_task_button" onClick={submitHandler}>update</button>
      </div>
    </div>
  );
};

export default UpdateTask;
