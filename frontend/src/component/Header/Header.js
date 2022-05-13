import React, { useEffect, useState } from "react";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {
  const [pic, setPic] = useState(null);
  const {user} = useSelector((state) => state.user);


  console.log(user.photoId);

  async function getImage() {
    const res = await fetch(`https://picsum.photos/id/${user.photoId}/info`);
    const data = await res.json();
    console.log(data);
    setPic(data.download_url);
  };
  useEffect(() => {
    getImage()
  }, []);

  return (
    <div className="header_body">
      <div className="header_content">
        <h1>TASKBOARD</h1>
        <img src={pic} alt="" className="profile_pic" />
      </div>
    </div>
  );
};

export default Header;
