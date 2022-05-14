import React from "react";
import "./LogoutModel.css";

const LogoutModel = (props) => {
  return (
    <div className="logoutmodel_body">
      <div className="logoutmodel_content">
        <h3>Are you sure?</h3>
        <div className="logout_buttons">
          <button onClick={props.logoutHandler}>YES</button>
          <button onClick={()=>props.setShow(false)}>CANCEL</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModel;
