import UploadPDF from "../components/uploadpdf";
import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../fireabse";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/slices/user";
import Nav from "../components/nav";
import "../styleSheet/Home.css";
import Footer from "../components/footer";
import "../styleSheet/Landing.css";
import vid from "../images/video1.mp4";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { Check2Circle, DatabaseFill } from "react-bootstrap-icons";
import img13 from "../images/19.png";
import Form from "../components/form";
// import Form from '../components/formcopy';
import "../styleSheet/Home.css";
import CreateUploadPopup from "../components/createUploadPopup";
import EnterPositionPopup from "../components/enterPositionPopup";

import { Power } from "react-bootstrap-icons";

export default function Home() {
  const [showHomePopup, setShowHomePopup] = useState(true);
  const [showJobPopup, setShowJobPopup] = useState(false);
  const [jobData, setJobData] = useState(null);
  const [personalData, setPersonalData] = useState({
    jobTitle: "",
    firstName: "",
    middleName: "",
    lastName: "",
    inputEmail: "",
    phone: "",
    dateOfBirth: "",
    city: "",
    address: "",
    postalCode: "",
    drivingLicense: "",
    nationality: "",
    placeOfBirth: "",
    country: "",
    professionalSummary: "",
    uploadedPhotoURL: "",
    employmentHistory: [
      {
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ],
    educationHistory: [
      {
        school: "",
        degree: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ],
    websitesAndLinks: [
      {
        name: "",
        url: "",
      },
    ],
    skills:[]
  });

  const openPopup = () => {
    setShowJobPopup(true);
  };

  const closeJobPopup = () => {
    setShowJobPopup(false);
  };

  const saveJobData = (data) => {
    setJobData(data);
    console.log(data);
  };

  const handleClosePopup = (value) => {
    console.log("CLOSSE", value)
    var open = false
    if(value != undefined)
      open = value;
      
    setShowHomePopup(open);
  };

  const handleUpload = (file) => {
    // upload file code
    console.log("File uploaded:", file.name);
  };

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
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <Nav />
      {/* {user&&user.credits&&<button  className="tokensBtn"> <DatabaseFill color="#35b276" size={22} style={{"position":"relative","top":"-2px"}}/> {user.credits} &nbsp;Credits</button>}   */}
      {user && user.credits && (
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
          className='custom-btn btn-2'
          style={{
            "z-index": "45",
            top: "25%",
            right: "13%",
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
          />{" "}
          &nbsp;{user.credits}{" "}
          <button
            onClick={() => navigate("/upgrade")}
            className='custom-btn'
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

      {showHomePopup && (
        <CreateUploadPopup
          personalData={personalData}
          setPersonalData={setPersonalData}
          onClose={handleClosePopup}
          onUpload={handleUpload}
        />
      )}
      <button onClick={() => handler()} className=' btn btn-success signoutBtn'>
        {" "}
        <Power color='#35b276' size={22} /> &nbsp;Signout
      </button>
      <div className='row homeDiv'>
        <div className='HomeLeftDiv col-md-9 col-sm-9'>
          <div className='formDetails'>
            <h3 className='formTitle'>Personalize your Profile</h3>
            <p className='formSubText'>
              "Tell us more about yourself and the position you're targeting,
              and we'll create a personlized resume just for you."
            </p>
            <hr className='hrLine' />
            <Form
              personalData={personalData}
              setPersonalData={setPersonalData}
            />
          </div>
          {/* <button onClick={openPopup}>Add Job</button>
                    {showJobPopup && (
                        <EnterPositionPopup onClose={closeJobPopup} onSave={saveJobData} />
                    )} */}
        </div>
      </div>

      {/* <UploadPDF />

            <div className='section4'>
                <div className='videoSection row'>
                    <div className='col-md-6 sec4MidDiv1 '>
                        <ReactPlayer
                            className="player"
                            url={vid}
                            width="90%"
                            height="100%"
                            playing={true}
                            muted={true}
                            autoplay={true}
                            repeat={true}
                        />
                    </div>
                    <div className='col-md-6 sec4MidDiv2'>
                        <h4>Our Features</h4>
                        <p><Check2Circle color="#35b276" size={20} /> &nbsp;Create Tailored resumes for specific job applications.</p>
                        <p><Check2Circle color="#35b276" size={19} /> &nbsp;Ensure resume pass through ATS for better visibility. </p>
                        <p><Check2Circle color="#35b276" size={19} /> &nbsp;Enhance resumes with professional formatting.</p>
                        <p><Check2Circle color="#35b276" size={19} /> &nbsp;Receive keyword suggestions for better targeting.</p>
                        <p><Check2Circle color="#35b276" size={19} /> &nbsp;Download customized resumes instanly for multiple job applications.</p>
                        <p><Check2Circle color="#35b276" size={19} /> &nbsp;Get help from our dedicated support team when you need it.</p>
                    </div>
                </div>
            </div>

            <div className='section5'>
                <img src={img13} className="sec5Img" />
                <h1>Expertise, commitment, and value. It's our mission to consistently provide these to our clients.</h1>
            </div>

            <Footer /> */}
    </>
  );
}
