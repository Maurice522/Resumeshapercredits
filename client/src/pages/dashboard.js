import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import { DatabaseFill, Power, Upload } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addUserResume,
  auth,
  getUserFromDatabase,
  updateUserResumes,
} from "../fireabse";
import {
  saveResume,
  signOutUser,
  updateResume,
  updateUser,
} from "../redux/slices/user";
import "../styleSheet/Dashboard.css";
import {
  upload,
  Share,
  ThreeDots,
  Check2Circle,
  PencilSquare,
  FileEarmarkArrowDownFill,
  Bullseye,
  PlusLg,
  PencilFill,
  Trash3Fill,
  ColumnsGap,
  Book,
  JournalRichtext,
  BagFill,
  GraphUpArrow,
  MegaphoneFill,
  Alipay,
  Bicycle,
  CheckSquare,
} from "react-bootstrap-icons";
import img1 from "../images/template1.PNG";
import img2 from "../images/template2.PNG";
import img3 from "../images/template3.PNG";
import img4 from "../images/template4.PNG";
import Templates from "../components/templates";
import JobPopup from "../components/jobPopup";
import { Tooltip } from "react-tooltip";
export default function Dashboard() {
  const navigate = useNavigate();
  const [gettingUser, SetGettingUser] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        SetGettingUser(true);
        const userFirebase = await getUserFromDatabase(user.email);
        dispatch(updateUser(userFirebase));
        initializeSavedResumes(userFirebase);
        SetGettingUser(false);
      } else {
        navigate("/");
      }
    });
  }, []);

  const [savedResumes, setSavedResumes] = useState([
    {
      resumeId: 1,
      img: img1,
      title: "My Profile",
      description: "Description",
      id: "id46876548",
      idx: -1,
    },
  ]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
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
  const initializeSavedResumes = (user) => {
    console.log(user);
    if (user.resumes) {
      var temp = [];
      var srem = {};
      var arr = [];
      console.log(user.resumes.length);
      const currentTimestamp = new Date().toLocaleString();
      for (var i = 0; i < user.resumes.length; i++) {
        var resume = user.resumes[i];
        var tempimg = img1;

        if (resume.resumeId === 2) {
          tempimg = img2;
        } else if (resume.resumeId === 3) {
          tempimg = img3;
        } else if (resume.resumeId === 4) {
          tempimg = img4;
        }
        srem.resumeId = resume.resumeId;
        srem.img = tempimg;
        srem.title = resume.jobTitle;
        srem.description = currentTimestamp;
        // srem.description =  resume.professionalSummary.substring(0, 20);
        srem.id = resume.id;
        srem.idx = i;
        arr = [...arr, srem];
        srem = {};
        // console.log(arr)
      }
      setSavedResumes(arr);
      // user.resumes.map((resume,index)=>{
      //     console.log(resume.resumeId)
      //     var tempimg = img1;

      //     if(resume.resumeId === 2){
      //         tempimg = img2;
      //     }else if(resume.resumeId === 3){
      //         tempimg = img3;
      //     }else if(resume.resumeId === 4){
      //         tempimg = img4;
      //     }
      //     console.log(resume.resumeId)
      //     srem.resumeId = resume.resumeId;
      //     console.log(srem.resumeId)
      //     srem.img = tempimg;
      //     srem.title = resume.jobTitle;
      //     srem.description = resume.professionalSummary.substring(0, 20);
      //     srem.id = resume.id;
      //     srem.idx = index;
      //     console.log(srem)
      //     temp.push(srem);
      //     console.log(temp)
      //     console.log(arr)
      // })
      // console.log(temp)
      // setSavedResumes(temp)
    }
  };

  const addSavedResume = () => {
    var temp = {
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
      websitesLinks: [
        {
          name: "",
          url: "",
        },
      ],
    };
    Object.entries(temp).map(([key, value]) => {
      temp[key] = user[key];
    });
    var resume = {
      ...temp,
      skills: [],
      customDetails: {
        courses: [],
        activities: [],
        internships: [],
        hobbies: [],
        languages: [],
        references: [],
        customSections: [],
      },
      resumeId: 1,
      id: "id" + new Date().getTime(),
    };

    var resumes = [...user.resumes, resume];
    const currentTimestamp = new Date().toLocaleString();
    addUserResume(user.email, resumes);
    dispatch(saveResume(resume));
    const newDiv = {
      resumeId: resume.resumeId,
      img: img1,
      title: resume.jobTitle,
      // description :  resume.professionalSummary.substring(0, 20),
      description: currentTimestamp,
      id: resume.id,
      idx: user.resumes.length,
    };
    setSavedResumes([...savedResumes, newDiv]);
  };

  const delSavedResume = async (id) => {
    setDeleting(true);
    const updatedResumes = savedResumes.filter((resumes) => resumes.id !== id);
    const updatedUserResumes = user.resumes.filter(
      (resumes) => resumes.id !== id
    );

    dispatch(updateResume(updatedUserResumes));
    await updateUserResumes(user.email, updatedUserResumes);
    setDeleting(false);
    setSavedResumes(updatedResumes);
  };

  const openSelectedResume = (idx) => {
    if (idx == -1) {
      navigate("/create");
    } else {
      navigate(`/createcontinue/${idx}`);
    }
  };
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const tailor = (idx) => {
    // setIsPopupOpen(!isPopupOpen);
    navigate(`/createcontinue/${idx}`, { state: { popon: true } });
  };
  const download = (idx) => {
    // setIsPopupOpen(!isPopupOpen);
    navigate(`/createcontinue/${idx}`, { state: { download: true } });
  };
  const handleSignup = () => {
    togglePopup();
  };
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      {gettingUser ? (
        <img
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width='240'
          height='240'
          alt='loading...'
          src='https://media2.giphy.com/media/MDrmyLuEV8XFOe7lU6/200w.webp?cid=ecf05e47k6onrtqddz8d98s4j5lhtutlnnegeus1pwcdwkxt&ep=v1_gifs_search&rid=200w.webp&ct=g'
        />
      ) : (
        <>
          <Nav />
          <button
            onClick={() => handler()}
            className=' btn btn-success signoutBtn'
          >
            {" "}
            <Power color='#35b276' size={22} /> &nbsp;Signout
          </button>
          <button
            className='custom-btnlanding btn-2'
            style={{
              "z-index": "45",
              top: "2.5%",
              right: "10%",
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
          {/* <button
            className='tokensBtn'
            style={{
              fontFamily: "Open Sans",
              fontWeight: "550",
              fontSize: "16px",
              color: "#347571",
            }}
          >
            <DatabaseFill
              color='#347571'
              size={24}
              style={{ position: "relative", top: "-2px" }}
            />{" "}
            &nbsp;{user.credits} Credits
          </button> */}

          <div className='dashboardDiv'>
            <h2 className='formTitle'>Resume Gallery</h2>
            <p className='formSubText'>
              "Welcome to your hub for organized resumes.Access, edit, or create
              new resumes for tailored job application."
            </p>
            <div className='dashHeader'>
              <h4>Documents</h4>
              <button
                className='createDoc zoom'
                onClick={() => navigate("/create")}
              >
                <PlusLg size={20} /> &nbsp;Create New
              </button>

              <button
                className='uploadDoc zoom'
                onClick={() => navigate("/create", { state: { upload: true } })}
                data-tooltip-id='uploadNewResumeInfo'
                data-tooltip-content='This will cost 4 credits'
              >
                <Upload size={20} /> &nbsp;Upload Resume
              </button>
              <Tooltip id='uploadNewResumeInfo' />
            </div>
            <hr className='dashHrLine' />
            {isPopupOpen && (
              <JobPopup onClose={togglePopup} onSignup={handleSignup} />
            )}
            <div className='dashContent row'>
              {savedResumes.map((savedResume) => (
                <div key={savedResume.id} className='resume1Div col-md-6'>
                  <div className='row'>
                    <div
                      className='col-md-4'
                      onClick={() => openSelectedResume(savedResume.idx)}
                    >
                      <img
                        src={savedResume.img}
                        className='resumeImg zoom'
                        alt='Profile Image'
                      />
                      <h6 className='resumeTitle'>{savedResume.title}</h6>
                    </div>
                    <div className='col-md-8 editResumeOptions'>
                      <button
                        className='editResumeBtns '
                        onClick={() => tailor(savedResume.idx)}
                      >
                        <Bullseye size={23} />
                        &nbsp;&nbsp;&nbsp;&nbsp;Tailor To Your Job
                      </button>
                      <br />
                      <button
                        className='editResumeBtns '
                        onClick={() => openSelectedResume(savedResume.idx)}
                      >
                        <PencilFill size={23} />
                        &nbsp;&nbsp;&nbsp;&nbsp;Edit
                      </button>
                      <br />
                      <button
                        className='editResumeBtns '
                        onClick={() => download(savedResume.idx)}
                      >
                        <FileEarmarkArrowDownFill size={23} />
                        &nbsp;&nbsp;&nbsp;&nbsp;Download
                      </button>
                      <br />
                      <button
                        className='editResumeBtns '
                        onClick={() => delSavedResume(savedResume.id)}
                      >
                        <Trash3Fill size={23} />
                        {deleting ? (
                          <>&nbsp;&nbsp;&nbsp;&nbsp;Deleting ...</>
                        ) : (
                          <>&nbsp;&nbsp;&nbsp;&nbsp;Delete</>
                        )}
                      </button>
                      <br />
                      {/* <button className='editResumeBtns ' onClick={() => console.log("more")}><ThreeDots size={23} />&nbsp;&nbsp;&nbsp;&nbsp;More</button><br /> */}
                    </div>
                    <p className='resumeDesc'>
                      <strong>Created At : </strong>
                      {savedResume.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className='resume1Div col-md-6  '>
                <div className='addNewResumeDiv zoom' onClick={addSavedResume}>
                  <button className='editResumeBtns addResumePlusBtn'>
                    <PlusLg size={35} />
                    <br />
                  </button>
                  <p>Add New</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
