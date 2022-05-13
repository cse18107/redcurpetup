import React,{useState} from 'react';
import './Overlya.css';

const Overlay = (props) => {
    const [show,setShow] = useState(props.show);
  return (
      <div className='overlay_body'>
    <div className='overlay_container' onClick={()=>props.setShow(!show)} ></div>
    <div className='overlay_content'>{props.children}</div>
    </div>

  )
}

export default Overlay