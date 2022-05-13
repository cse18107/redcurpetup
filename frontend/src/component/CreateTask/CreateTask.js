import React,{useState} from "react";
import "./CreateTask.css";
import { useDispatch } from "react-redux";
import { createTask, loadTask } from "../../actions/taskActions";

const CreateTask = (props) => {
    const [show,setShow] = useState(props.show);
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [date,setDate] = useState();
    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(createTask({task:name,description,date})).then(()=>{
            dispatch(loadTask());
        });
        props.setShow(!show)
    }

     return (
    <div className="create_task_body">
      <div className="create_task_content">
          <h1 className="cross_sign" onClick={()=>{props.setShow(!show)}}>×</h1>
          <h1 className="create_task_heading">Create Task</h1>
        <input className="name_input" value={name} onChange={(e)=>setName(e.target.value)} placeholder={"Enter name"} />
        <textarea
          className="description_input"
          placeholder={"Enter description"}
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        <span className="datepicker-toggle">
          <span className="datepicker-toggle-button">{!date ? "Enter date":new Date(date).toDateString()}</span>
          <input type="date" className="datepicker-input" onChange={(e)=>setDate(e.target.value)} />
        </span>
        <button className="create_task_button" onClick={submitHandler}>Create</button>
      </div>
    </div>
  );
};

export default CreateTask;
