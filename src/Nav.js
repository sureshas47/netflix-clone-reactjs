import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const history = useHistory();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    // cleanup function
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    //   if show is true
    <div className={`nav ${show && "nav_black"}`}>
      <div className="nav_contains">
        <img
        onClick={()=>history.push("/")}
          className="nav_logo"
          src="https://i1.wp.com/freepngimages.com/wp-content/uploads/2016/10/netflix-logo.png?fit=895%2C559"
          alt=""
        />

        <img 
          onClick={()=>history.push("/profile")}
          className="nav_avatar"
          src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
