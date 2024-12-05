import React from "react";
import "../styleSheet/Nav.css";
import img1 from "../images/3.png";
import img2 from "../images/25.png";
import img3 from "../images/26.png";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const redirectHome = () => {
    navigate("/");
  };

  return (
    <div>
      <nav class='navbar bg-body-tertiary myNav'>
        <div class='container-fluid'>
          <a class='navbar-brand mb-0 h1 navText' href='#'>
            &nbsp; &nbsp;
            <img src={img3} class='logoImg' />
            &nbsp; &nbsp;
            <strong onClick={redirectHome}>RESUME SHAPER</strong>
          </a>
        </div>
      </nav>
    </div>
  );
}
