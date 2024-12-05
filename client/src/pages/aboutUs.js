import React from "react";
import Nav from "../components/nav";
import "../styleSheet/AboutUs.css";
import img1 from "../images/aboutUs.png";
import Footer from "../components/footer";
import { Power, ArrowLeft, DatabaseFill } from "react-bootstrap-icons";
import { signOut } from "firebase/auth";
import { auth } from "../fireabse";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = (e) => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
        console.log("signed out successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const returnBack = (e) => {
    navigate("/");
  };
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      {user && user.profile && user.credits && (
        // <button
        //   className='tokensBtn'
        //   style={{
        //     fontFamily: "Open Sans",
        //     fontWeight: "550",
        //     fontSize: "16px",
        //     color: "#347571",
        //   }}
        // >
        //   <DatabaseFill
        //     color='#347571'
        //     size={24}
        //     style={{ position: "relative", top: "-2px" }}
        //   />{" "}
        //   &nbsp;{user.credits} Credits
        // </button>
        <button
          className='custom-btnlanding btn-2'
          style={{
            "z-index": "45",
            top: "3%",
            right: "17%",
            cursor: "none",
            fontFamily: "Open Sans",
            textAlign: "left",
            color: "#ecf8e5",
            backgroundColor: "#347571",
            fontWeight: "550",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          {" "}
          <DatabaseFill
            color='#ecf8e5'
            size={22}
            style={{ position: "relative", top: "-2px" }}
          />
          {"  "}
          &nbsp;{user.credits}
          {"  "}
          <button
            onClick={() => navigate("/upgrade")}
            className='custom-btnlanding'
            style={{
              width: "100px",
              "z-index": "45",
              top: "0%",
              right: "0%",
              fontFamily: "Open Sans",
              textAlign: "center",
              color: "#347571",
              backgroundColor: "#ecf8e5",
              fontWeight: "550",
              paddingLeft: "8px",
              paddingRight: "8px",
              paddingTop: "1px",
              paddingBottom: "1px",
              height: "32px",
              marginTop: "4px",
              fontSize: "12px",
              marginRight: "10px",
              border: "none",
            }}
          >
            Upgrade
          </button>
        </button>
      )}

      {user && user.profile && (
        <button
          onClick={() => handler()}
          className=' btn btn-success signoutBtn aboutUsSignOutBtn'
        >
          {" "}
          <Power color='#35b276' size={22} /> &nbsp;Signout
        </button>
      )}
      <Nav />
      <div className='aboutUsContainer'>
        <h1 className='aboutUsHeadig'>
          <ArrowLeft
            color='#35b276'
            size={30}
            className='returnBackArrow'
            onClick={() => returnBack()}
          />
          About Us
        </h1>
        <hr></hr>

        <div className='aboutUsImgDiv'>
          <img src={img1} className='aboutUsImg' />
        </div>

        <p className='aboutUsContent'>
          Welcome to SaaSmartSolutions, where we are dedicated to crafting
          innovative solutions that simplify lives through technology. Our team
          has invested significant effort in creating a platform that can
          revolutionize your job application experience. Introducing our
          flagship product, the Resume Shaper.
        </p>
        <p className='aboutUsContent'>
          At SaaSmartSolutions, we understand the challenges of navigating the
          ever-evolving job market. That's why we've developed a cutting-edge
          Resume Shaper, designed to empower you in shaping resumes effortlessly
          on the go. Leveraging the capabilities of GPT tools, our platform
          ensures that your resumes stand out and make a lasting impression on
          potential employers.
        </p>
        <p className='aboutUsContent'>
          Whether you're a seasoned professional or just starting your career
          journey, our Resume Shaper is tailored to meet your needs. It provides
          a seamless and user-friendly experience, allowing you to create
          personalized resumes for any job application with ease. Our commitment
          is to provide you with the tools you need to present your skills and
          experiences in the best possible light.
        </p>
        <p className='aboutUsContent'>
          Explore SaaSmartSolutions and experience the future of resume
          crafting. Elevate your job application game with our innovative
          platform and let your achievements shine. We believe in making
          technology work for you, and our Resume Shaper is a testament to that
          commitment. Join us on this journey of empowerment and efficiency.
          Shape your future with SaaSmartSolutions.
        </p>
      </div>
      <Footer />
    </div>
  );
}
