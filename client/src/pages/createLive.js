import React, { useState, useEffect, useRef } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  addUserResume,
  auth,
  getUserFromDatabase,
  updateUserCreditsInDatabase,
} from "../fireabse";
import { useDispatch, useSelector } from "react-redux";
import {
  saveResume,
  setResume,
  signOutUser,
  updateCredits,
  updateUser,
} from "../redux/slices/user";
import Nav from "../components/nav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Power, List } from "react-bootstrap-icons";
import MyPdfViewer2 from "../components/pdfDisplayFeTemp2";
import MyPdfViewer3 from "../components/pdfDisplayFeTemp3";
import MyPdfViewer4 from "../components/pdfDisplayFeTemp4";
import MyPdfViewer1 from "../components/pdfDisplayFeTemp1";
import {
  DatabaseFill,
  Coin,
  CaretDownSquareFill,
  CaretUpSquareFill,
  PlusCircleFill,
  Crop,
  FileEarmarkArrowDownFill,
  Check2Circle,
  Check2All,
  Check,
  PersonCheck,
  PersonSquare,
  CaretDownSquare,
  JournalBookmarkFill,
  PenFill,
  Trash3Fill,
  PlusLg,
  JournalCheck,
  Link45deg,
  TrophyFill,
} from "react-bootstrap-icons";
import CustomSection from "../components/formComponents/customSection";
import {
  updateUserProfileInDatabase,
  updateUserPhotoInDatabase,
  uploadMedia,
} from "../fireabse";
import { updatePhoto, updateProfile } from "../redux/slices/user";
import "../styleSheet/createLive.css";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PdfDisplayBE from "../components/pdfDisplayBE";
import Test from "./test";
import "../styleSheet/Nav.css";
import img3 from "../images/26.png";
import img4 from "../images/template1.PNG";
import img5 from "../images/template2.PNG";
import img6 from "../images/template3.PNG";
import img7 from "../images/template4.PNG";
import vid1 from "../images/tailorVid2.mp4";
import vid2 from "../images/tailorVid1.mp4";
import ReactPlayer from "react-player";
import JobPopup from "../components/jobPopup";
import { toast } from "react-toastify";
import MyPdfViewerTest from "../components/pdfDisplayFeTest";
import { Tooltip } from "react-tooltip";

// import skills from '../components/formComponents/skills';

export default function CreateLiveContinue() {
  const { idx } = useParams();
  const location = useLocation();

  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState("");
  const [searchText, setSearchText] = useState("");
  const [photoLoader, setPhotoLoader] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [downloadPdf, setDownloadPdf] = useState(false);
  const [uploadedPhotoDataURL, setUploadedPhotoDataURL] = useState("");
  const [customDetails, setCustomDetails] = useState({
    courses: [],
    activities: [],
    internships: [],
    hobbies: [],
    languages: [],
    references: [],
    customSections: [],
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(1);
  const [aiLoading, setAiLoading] = useState(false);
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
  });

  const [gettingUser, SetGettingUser] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [currId, setCurrId] = useState(null);
  const [count, setCount] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(true);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (userAuth) => {
      if (userAuth) {
        if (user.email === null) {
          SetGettingUser(true);
          const userFirebase = await getUserFromDatabase(userAuth.email);
          await dispatch(updateUser(userFirebase));
          SetGettingUser(false);
        }
      } else {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    if (user.email !== null && count < 1) {
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
        websitesAndLinks: [
          {
            name: "",
            url: "",
          },
        ],
      };
      console.log(location);
      if (location.state !== null) {
        if (location.state.popon) setIsPopupOpen(location.state.popon);

        if (location.state.download) setDownloadPdf(location.state.download);
      }
      console.log("started");
      Object.entries(temp).map(([key, value]) => {
        temp[key] = user.resumes[idx][key];
      });
      console.log(user.resumes[idx]);
      setCustomDetails(user.resumes[idx].customDetails);
      setActivities(user.resumes[idx].customDetails.activities);
      setCourses(user.resumes[idx].customDetails.courses);
      setInternships(user.resumes[idx].customDetails.internships);
      setReferences(user.resumes[idx].customDetails.references);
      setCustomSections(user.resumes[idx].customDetails.customSections);
      setLanguages(user.resumes[idx].customDetails.languages);
      setHobbies(user.resumes[idx].customDetails.hobbies);
      setCurrId(user.resumes[idx].id);
      setSelectedOptions(user.resumes[idx].skills);
      setSelectedTemplateId(user.resumes[idx].resumeId);
      setPersonalData(temp);
      setCount(1);
    }
  }, [user]);

  // const saveResume= async(e)=>{

  //         e.preventDefault();

  //         var resume = {
  //           ...personalData,
  //           skills: selectedOptions,
  //           customDetails,
  //           resumeId:selectedTemplateId
  //         }
  //         console.log(resume)
  //         var resumes = [...user.resume, resume]
  //         console.log("Login email  " + user.email)
  //         await addUserResume(user.email, resumes);
  //         console.log(user)
  //         dispatch(saveResume(resume));
  //         console.log(user)

  //         // dispatch(updateUser(resume));
  //         // navigate("/dashboard")

  // }

  useEffect(() => {
    setAiLoading(false);
  }, []);

  const handleDownload = () => {
    console.log("berfore", downloadPdf);
    setDownloadPdf(true);
    console.log(downloadPdf);
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
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

  useEffect(() => {
    setShowDropdown(false);
  }, [selectedOptions]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      courses: courses,
    });
  }, [courses]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      activities: activities,
    });
  }, [activities]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      internships: internships,
    });
  }, [internships]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      references: references,
    });
  }, [references]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      languages: languages,
    });
  }, [languages]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      hobbies: hobbies,
    });
  }, [hobbies]);

  useEffect(() => {
    setCustomDetails({
      ...customDetails,
      customSections: customSections,
    });
  }, [customSections]);

  // Function to log the selected skills
  useEffect(() => {
    console.log("Selected Skills:", selectedOptions);
  }, [selectedOptions]);

  const playerRef = useRef(null);

  const handleEnded = () => {
    // Restart the video when it ends
    playerRef.current.seekTo(0);
  };

  const playerRef1 = useRef(null);

  const handleEnded1 = () => {
    // Restart the video when it ends
    playerRef1.current.seekTo(0);
  };

  const playerRef2 = useRef(null);

  const handleEnded2 = () => {
    // Restart the video when it ends
    playerRef2.current.seekTo(0);
  };

  const playerRef3 = useRef(null);

  const handleEnded3 = () => {
    // Restart the video when it ends
    playerRef3.current.seekTo(0);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddSkill = () => {
    if (options.trim() !== "") {
      setSelectedOptions([...selectedOptions, options]);
      setOptions("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedOptions.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedOptions(updatedSkills);
  };

  {
    /* ********************************OLD SKILLS SECTION**************************************** */
  }
  // const handleSearchTextChange = (e) => {
  //     const text = e.target.value;
  //     setSearchText(text);
  //     setShowDropdown(true);
  // };

  // const handleOptionClick = (option) => {
  //     if (!selectedOptions.includes(option)) {
  //         setSelectedOptions([...selectedOptions, option]);
  //         setSearchText('');
  //     }
  // };

  // const handleRemoveOption = (optionToRemove) => {
  //     const updatedSelectedOptions = selectedOptions.filter(
  //         (option) => option !== optionToRemove
  //     );
  //     setSelectedOptions(updatedSelectedOptions);
  // };
  {
    /* ********************************OLD SKILLS SECTION**************************************** */
  }

  const filteredOptions = selectedOptions.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const addWebsiteLink = () => {
    setPersonalData((prevData) => ({
      ...prevData,
      websitesAndLinks: [
        ...prevData.websitesAndLinks,
        {
          name: "",
          url: "",
        },
      ],
    }));
  };

  const removeWebsiteLink = (index) => {
    setPersonalData((prevData) => {
      const updatedWebsitesLinks = [...prevData.websitesAndLinks];
      updatedWebsitesLinks.splice(index, 1);
      return {
        ...prevData,
        websitesAndLinks: updatedWebsitesLinks,
      };
    });
  };

  const updateWebsiteLinkField = (index, field, value) => {
    var updatedWebsitesLinks = [];
    personalData.websitesAndLinks.map((item, idx2) => {
      var temp;
      if (idx2 === index) {
        temp = { ...item, writable: true };
        temp[field] = value;
        delete temp.writable;
      } else {
        temp = item;
      }
      updatedWebsitesLinks = [...updatedWebsitesLinks, temp];
    });
    setPersonalData((prevData) => {
      return {
        ...prevData,
        websitesAndLinks: updatedWebsitesLinks,
      };
    });
  };

  const moveWebsiteLink = (currentIndex, targetIndex) => {
    setPersonalData((prevData) => {
      const updatedWebsitesAndLinks = [...prevData.websitesAndLinks];
      const [movedItem] = updatedWebsitesAndLinks.splice(currentIndex, 1);
      updatedWebsitesAndLinks.splice(targetIndex, 0, movedItem);

      return {
        ...prevData,
        websitesAndLinks: updatedWebsitesAndLinks,
      };
    });
  };

  const addEducationHistory = () => {
    setPersonalData((prevData) => ({
      ...prevData,
      educationHistory: [
        ...prevData.educationHistory,
        {
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          city: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducationHistory = (index) => {
    setPersonalData((prevData) => {
      const updatedEducationHistory = [...prevData.educationHistory];
      updatedEducationHistory.splice(index, 1);
      return {
        ...prevData,
        educationHistory: updatedEducationHistory,
      };
    });
  };

  const updateEducationField = (index, field, value) => {
    var updateEducationFieldHistory = [];
    personalData.educationHistory.map((item, idx2) => {
      var temp;
      if (idx2 === index) {
        temp = { ...item, writable: true };
        temp[field] = value;
        delete temp.writable;
      } else {
        temp = item;
      }
      updateEducationFieldHistory = [...updateEducationFieldHistory, temp];
    });
    setPersonalData((prevData) => {
      return {
        ...prevData,
        educationHistory: updateEducationFieldHistory,
      };
    });
  };

  // const moveEducation = (currentIndex, targetIndex) => {
  //     setPersonalData((prevData) => {
  //       const updateEducationFieldHistory = [...prevData.educationHistory];
  //       const [movedItem] = updateEducationFieldHistory.splice(currentIndex, 1);
  //       updateEducationFieldHistory.splice(targetIndex, 0, movedItem);
  //       return {
  //         ...prevData,
  //         educationHistory: updateEducationFieldHistory,
  //       };
  //     });
  //   };

  const moveEducation = (currentIndex, targetIndex) => {
    setPersonalData((prevData) => {
      const updatedEducationHistory = [...prevData.educationHistory];
      const [movedItem] = updatedEducationHistory.splice(currentIndex, 1);
      updatedEducationHistory.splice(targetIndex, 0, movedItem);

      return {
        ...prevData,
        educationHistory: updatedEducationHistory,
      };
    });
  };

  const addEmploymentHistory = () => {
    setPersonalData({
      ...personalData,
      employmentHistory: [
        ...personalData.employmentHistory,
        {
          jobTitle: "",
          employer: "",
          startDate: "",
          endDate: "",
          city: "",
          description: "",
        },
      ],
    });
  };

  const removeEmploymentHistory = (index) => {
    setPersonalData((prevData) => {
      const updatedEmploymentHistory = [...prevData.employmentHistory];
      updatedEmploymentHistory.splice(index, 1);
      console.log(updatedEmploymentHistory);
      return {
        ...prevData,
        employmentHistory: updatedEmploymentHistory,
      };
    });
  };

  const updateEmploymentField = (index, field, value) => {
    var updatedEmploymentHistory = [];
    personalData.employmentHistory.map((item, idx2) => {
      var temp;
      if (idx2 === index) {
        temp = { ...item, writable: true };
        temp[field] = value;
        delete temp.writable;
      } else {
        temp = item;
      }
      updatedEmploymentHistory = [...updatedEmploymentHistory, temp];
    });
    setPersonalData((prevData) => {
      return {
        ...prevData,
        employmentHistory: updatedEmploymentHistory,
      };
    });

    // setPersonalData((prevData) => {
    //     const updatedEmploymentHistory = [...prevData.employmentHistory];
    //     updatedEmploymentHistory[index][field] = value;
    //     return {
    //         ...prevData,
    //         employmentHistory: updatedEmploymentHistory,
    //     };
    // });
  };

  const moveEmployment = (currentIndex, targetIndex) => {
    setPersonalData((prevData) => {
      const updatedEmploymentHistory = [...prevData.employmentHistory];
      const [movedItem] = updatedEmploymentHistory.splice(currentIndex, 1);
      updatedEmploymentHistory.splice(targetIndex, 0, movedItem);
      return {
        ...prevData,
        employmentHistory: updatedEmploymentHistory,
      };
    });
  };

  const handleLogDetails = async (e) => {
    e.preventDefault();
    var resume = {
      ...personalData,
      skills: selectedOptions,
      customDetails,
      resumeId: selectedTemplateId,
      id: currId !== null ? currId : "id" + new Date().getTime(),
    };

    Object.entries(resume).map(([key, value]) => {
      if (value == undefined) {
        resume[key] = "";
      }
    });
    console.log(resume);
    console.log(user.resumes);

    var tempResume = [];

    user.resumes.map((item, idx) => {
      if (item.id !== currId) {
        tempResume = [...tempResume, item];
      }
    });

    var resumes = [...tempResume, resume];

    // var tempids = []

    // tempResume.map((item)=>{
    //     tempids = [...tempids, item.id]
    // })

    // console.log(tempids.includes(currId))

    // resumes = [...resumes, resume]

    console.log(resumes);

    console.log("Login email  " + user.email);
    await addUserResume(user.email, resumes);
    console.log(user);
    dispatch(setResume(resumes));
    console.log(user);
    toast.success("Saved Resume!");

    // dispatch(updateUser(resume));

    // navigate("/dashboard")

    // console.log(personalData)
    // console.log(customDetails)
    // var profile = {
    //     ...personalData,
    //     skills: selectedOptions,
    //     customDetails
    // }
    // console.log("Login email  " + user.email)
    // await updateUserProfileInDatabase(user.email, profile)
    // dispatch(updateProfile(profile));
    // console.log('Form Input Details:', profile);
    // setDownloadPdf(true)
    // navigate("/dashboard")
  };

  const toggleAdditionalDetails = () => {
    setShowAdditionalDetails(!showAdditionalDetails);
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setPhotoLoader(true);
      const photoFile = files[0];
      setImgFile(URL.createObjectURL(e.target.files[0]));
      //To  Display the uploaded photo
      if (photoFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedPhotoDataURL();
          const uploadedPhotoDataURL = e.target.result;
          // console.log("local1", uploadedPhotoDataURL)
        };
        const photoFileLink = await uploadMedia(photoFile, "profilePhoto");
        console.log("local2", photoFileLink);
        setPersonalData({
          ...personalData,
          uploadedPhotoURL: photoFileLink,
        });
        // await updateUserPhotoInDatabase(user.email, photoFileLink)
        // dispatch(updatePhoto(photoFileLink))
        reader.readAsDataURL(photoFile);
        console.log("my phtoo ", photoFileLink);
        setPhotoLoader(false);
      }
    } else {
      setPersonalData({
        ...personalData,
        [name]: value,
      });
    }
  };

  const redirectHome = () => {
    navigate("/");
  };

  const getAiSkills = async (price) => {
    const cost = price ? price : 3;
    console.log("started");
    if (user.credits < cost) {
      return toast.error("Not Enough Credits!");
    }
    if (personalData.jobTitle === "") {
      return toast.info("Fill Job Title");
    }
    try {
      setAiLoading(true);

      var gotResult = false;

      var attempts = 1;
      var totalAttempts = 3;
      console.log(personalData.employmentHistory)
      while(gotResult == false){

      var res = await fetch("https://resumeapi-paem.onrender.com/skill", {
        method: "POST",
        body: JSON.stringify({
          title: jobTitle === "" ? personalData.jobTitle : jobTitle,
          employmentHistory: personalData.employmentHistory,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          return responseJson;
        });
      if (Array.isArray(res)) {
        console.log(res);
        setSelectedOptions([...selectedOptions, ...res]);
        await updateUserCreditsInDatabase(user.email, user.credits - cost);
        dispatch(updateCredits(user.credits - cost));
        gotResult = true;
      } else {
        toast.error("Network Error")
        toast.info(`Attempt ${attempts} of ${totalAttempts}`)
        attempts++;
        console.log("Error");
      }

      if(attempts==totalAttempts){
        attempts++;
        gotResult = true;
      }
    }

    } catch (err) {
      console.log(err);
    }
    if(attempts>totalAttempts){
      toast.error("Technical Difficulties Try Again Later")
     }
    console.log("ended");
    setAiLoading(false);
  };
  const getJD = async (idx, price) => {
    const cost = price ? price : 3;
    console.log("started JD");
    if (user.credits < cost) {
      return toast.error("Not Enough Credits!");
    }
    if (jobTitle === "" || jobDescription === "") {
      setIsPopupOpen(true);
      return toast.info("Fill Job Title and Description");
    }
    try {
      setAiLoading(true);
      var gotResult = false;

      var attempts = 1;
      var totalAttempts = 3;

      while(gotResult == false){
      var res = await fetch("https://resumeapi-paem.onrender.com/jobdes", {
        method: "POST",
        body: JSON.stringify({
          title: jobTitle,
          description: jobDescription,
          job: personalData.employmentHistory[idx],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson)
          return responseJson;
        });
        if(res.error){
          toast.error("Network Error")
          toast.info(`Attempt ${attempts} of ${totalAttempts}`)
          attempts++;
        }else{
          gotResult = true;
        }

        if(attempts==totalAttempts){
          attempts++;
          gotResult = true;
        }
      console.log(res, idx);
     
      }
      if(attempts>totalAttempts){
        toast.error("Technical Difficulties Try Again Later")
       }else{
        updateEmploymentField(idx, "description", res);
        await updateUserCreditsInDatabase(user.email, user.credits - cost);
        dispatch(updateCredits(user.credits - cost));
       }
    } catch (err) {
      console.log(err);
    }
    console.log("ended JD");
    setAiLoading(false);
  };

  const getSummary = async (price) => {
    const cost = price ? price : 3;
    console.log("started");
    if (user.credits < cost) {
      return toast.error("Not Enough Credits!");
    }
    if (jobTitle === "" || jobDescription === "") {
      setIsPopupOpen(true);
      return toast.info("Fill Job Title and Description");
    }
    try {
      setAiLoading(true);

      var gotResult = false;

      var attempts = 1;
      var totalAttempts = 3;

      while(gotResult == false){

      var res = await fetch("https://resumeapi-paem.onrender.com/summary", {
        method: "POST",
        body: JSON.stringify({
          title: jobTitle,
          description: jobDescription,
          details: personalData.professionalSummary,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson)
          return responseJson;
        });

        if(res.error){
          toast.error("Network Error")
          toast.info(`Attempt ${attempts} of ${totalAttempts}`)
          attempts++;
        }else{
          gotResult = true;
        }

        if(attempts==totalAttempts){
          attempts++;
          gotResult = true;
        }

      console.log(res.professionalSummary);
      
      }
      if(attempts>totalAttempts){
        toast.error("Technical Difficulties Try Again Later")
       }else{
        setPersonalData({
          ...personalData,
          professionalSummary: res.professionalSummary,
        });
        await updateUserCreditsInDatabase(user.email, user.credits - cost);
        dispatch(updateCredits(user.credits - cost));
       }
    } catch (err) {
      console.log(err);
    }
    console.log("ended");
    setAiLoading(false);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleSignup = () => {
    togglePopup();
  };
  const deleteUploadedPicOfForm = (e) => {
    e.preventDefault();
    if (personalData.uploadedPhotoURL != "" && !photoLoader) {
      setPersonalData({
        ...personalData,
        uploadedPhotoURL: "",
      });
    } else if (personalData.uploadedPhotoURL === "") {
      alert("no picture uploaded");
    }
  };

  const [showMenu, setShowMenu] = useState(false);
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    if (window.innerWidth > 890) {
      setShowMenu(false);
    }
    const handleResize = () => {
      if (window.innerWidth > 890) {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          {downloadPdf ? (
            <PdfDisplayBE
              imgFile={imgFile}
              personalData={personalData}
              courses={courses}
              activities={activities}
              internships={internships}
              hobbies={hobbies}
              languages={languages}
              references={references}
              customSections={customSections}
              skills={selectedOptions}
              downloadPdf={downloadPdf}
              setDownloadPdf={setDownloadPdf}
              selectedTemplateId={selectedTemplateId}
            />
          ) : (
            <>
              <div>
                <nav class='navbar bg-body-tertiary myNav createLiveNav'>
                  <div
                    class='container-fluid'
                    style={{ width: "auto", padding: 0, margin: 0 }}
                  >
                    <a class='navbar-brand mb-0 h1 navText' href='#'>
                      &nbsp; &nbsp;
                      <img src={img3} class='logoImg' alt='' />
                      &nbsp; &nbsp;
                      <strong onClick={redirectHome}>RESUME SHAPER</strong>
                    </a>
                  </div>
                  {/* <button className='downloadPdfBtn zoom'>super</button> */}
                  <div className='menuoptions2'>
                    <button
                      onClick={(e) => handleLogDetails(e)}
                      className=' SaveBtn zoom'
                      disabled={photoLoader}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDashboard()}
                      className=' dashboardBtn zoom'
                      disabled={photoLoader}
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={() => handleDownload()}
                      className=' downloadPdfBtn zoom'
                      disabled={photoLoader}
                    >
                      Download PDF
                    </button>
                    <button
                      className='custom-btn btn-2'
                      style={{
                        // "z-index": "45",
                        // top: "25%",
                        // right: "13%",
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
                          //   marginTop: "4px",
                          fontSize: "12px",
                          //   marginRight: "10px",
                          border: "none",
                        }}
                      >
                        Upgrade
                      </button>
                    </button>
                    <button
                      onClick={() => handler()}
                      className=' btn btn-success signoutBtn createLiveSignOut'
                    >
                      <Power color='#35b276' size={22} /> &nbsp;Signout
                    </button>
                  </div>
                  {showMenu && (
                    <div className='menuoptions'>
                      <button
                        onClick={(e) => handleLogDetails(e)}
                        className=' SaveBtn zoom'
                        disabled={photoLoader}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDashboard()}
                        className=' dashboardBtn zoom'
                        disabled={photoLoader}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => handleDownload()}
                        className=' downloadPdfBtn zoom'
                        disabled={photoLoader}
                      >
                        Download PDF
                      </button>
                      <button
                        className='custom-btn btn-2'
                        style={{
                          // "z-index": "45",
                          // top: "25%",
                          // right: "13%",
                          cursor: "none",
                          fontFamily: "Open Sans",
                          textAlign: "left",
                          color: "#ecf8e5",
                          backgroundColor: "#347571",
                          fontWeight: "550",
                          display: "flex",
                          alignItems: "center",
                          // gap: "5px",
                          justifyContent: "space-between",
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
                          onClick={() => toast.info("Coming Soon !")}
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
                            //   marginTop: "4px",
                            fontSize: "12px",
                            //   marginRight: "10px",
                            border: "none",
                          }}
                        >
                          Upgrade
                        </button>{" "}
                      </button>
                      <button
                        onClick={() => handler()}
                        className=' btn btn-success signoutBtn createLiveSignOut'
                      >
                        <Power color='#35b276' size={22} /> &nbsp;Signout
                      </button>
                    </div>
                  )}
                  <button className='menubtn' onClick={handleMenu}>
                    <List color='#35b276' size={22} />
                  </button>
                </nav>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "50%",
                  left: "0%",
                  marginTop: "5%",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div className='createLeftFormDiv'>
                    <h3 className='formTitle'>Personalize your Profile</h3>
                    <p className='formSubText'>
                      "Tell us more about yourself and the position you're
                      targeting, and we'll create a personlized resume just for
                      you."
                    </p>
                    <hr className='hrLine createLiveHrLine' />
                    <div className='tailorDiv zoom' onClick={togglePopup}>
                      {/* <img src={img8} className='tailorDivImg' ></img> */}
                      {/* <ReactPlayer
                        style={{ cursor: "pointer" }}
                        className='player'
                        url={vid2}
                        width='95%'
                        height='100%'

                        playing={true}
                        muted={true}
                        autoplay={true}
                        onEnded={handleEnded}
                        ref={playerRef}
                      /> */}
                    </div>
                    {isPopupOpen && (
                      <JobPopup
                        onClose={togglePopup}
                        onSignup={handleSignup}
                        personalData={personalData}
                        setPersonalData={setPersonalData}
                        jobTitle={jobTitle}
                        setJobTitle={setJobTitle}
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                        getSummary={getSummary}
                        getAiSkills={getAiSkills}
                        getJD={getJD}
                      />
                    )}
                    <h5 className='formSection createFormSection'>
                      <Crop color='#35b276' size={29} /> &nbsp;Select Template
                    </h5>
                    <div className='templateDiv'>
                      <div
                        id='carouselExampleIndicators'
                        className='carousel slide'
                      >
                        <div className='carousel-inner'>
                          <div className='carousel-item live-carousel-item active'>
                            <div className='row'>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(1)}
                              >
                                <img src={img4} className='tempalteImage ' />
                              </div>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(2)}
                              >
                                <img src={img5} className='tempalteImage ' />
                              </div>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(3)}
                              >
                                <img src={img6} className='tempalteImage ' />
                              </div>
                            </div>
                          </div>
                          <div className='carousel-item live-carousel-item'>
                            <div className='row'>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(4)}
                              >
                                <img src={img7} className='tempalteImage ' />
                              </div>
                              <div className='col-md-4 zoom'></div>
                              <div className='col-md-4 zoom'></div>

                              {/* <div className='col-md-4 zoom' onClick={() => setSelectedTemplateId(1)}>
                                                            <img src={img4} className='tempalteImage ' />
                                                        </div>
                                                        <div className='col-md-4 zoom'>
                                                            <img src={img5} className='tempalteImage ' onClick={() => setSelectedTemplateId(2)} />
                                                        </div> */}
                            </div>
                          </div>
                          <div className='carousel-item live-carousel-item '>
                            <div className='row'>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(3)}
                              >
                                <img src={img6} className='tempalteImage ' />
                              </div>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(4)}
                              >
                                <img src={img7} className='tempalteImage ' />
                              </div>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(1)}
                              >
                                <img src={img4} className='tempalteImage ' />
                              </div>
                            </div>
                          </div>
                          <div className='carousel-item live-carousel-item '>
                            <div className='row'>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(2)}
                              >
                                <img src={img5} className='tempalteImage ' />
                              </div>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(3)}
                              >
                                <img src={img6} className='tempalteImage ' />
                              </div>
                              <div
                                className='col-md-4 zoom'
                                onClick={() => setSelectedTemplateId(4)}
                              >
                                <img src={img7} className='tempalteImage ' />
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className='carousel-control-prev live-carousel-control-prev'
                          type='button'
                          data-bs-target='#carouselExampleIndicators'
                          data-bs-slide='prev'
                        >
                          <span
                            className='carousel-control-prev-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='visually-hidden'>Previous</span>
                        </button>
                        <button
                          className='carousel-control-next live-carousel-control-next'
                          type='button'
                          data-bs-target='#carouselExampleIndicators'
                          data-bs-slide='next'
                        >
                          <span
                            className='carousel-control-next-icon'
                            aria-hidden='true'
                          ></span>
                          <span className='visually-hidden'>Next</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <h5 className='formSection createFormSection'>
                        <PersonCheck color='#35b276' size={29} /> &nbsp;Personal
                        Details
                      </h5>
                      <form onSubmit={handleLogDetails}>
                        <div className='row'>
                          <div className='col-md-6'>
                            <label className='detailsInfoLabel'>
                              Current Position{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />

                            <input
                              className='detailsInfoInput'
                              type='text'
                              name='jobTitle'
                              value={personalData.jobTitle}
                              onChange={handleChange}
                              required='true'
                            />
                          </div>

                          <div className='col-md-6 uplouploadPictureBigDiv'>
                            <label className='detailsInfoLabel uplouploadPictureDivLabel createUplouploadPictureDivLabel'>
                              Upload Photo
                            </label>
                            <input
                              type='file'
                              className='detailsInfoInput uploadPictureInput createUploadPictureInput'
                              name='photo'
                              accept='image/*'
                              onChange={handleChange}
                            />

                            {personalData.uploadedPhotoURL == "" &&
                              !photoLoader && (
                                <PersonSquare
                                  size={70}
                                  className='uplouploadPhotoDivIcon createUplouploadPhotoDivIcon'
                                />
                              )}
                            {!photoLoader && personalData.uploadedPhotoURL && (
                              <div className='uplouploadPhotoDiv'>
                                <img
                                  src={personalData.uploadedPhotoURL}
                                  className='uploadedPicture createUploadedPicture'
                                  alt='Uploaded'
                                  width='70'
                                />
                              </div>
                            )}
                            {photoLoader && (
                              <div className='uplouploadPhotoDivGif createUplouploadPhotoDivGif'>
                                <iframe
                                  src='https://giphy.com/embed/3oEjI6SIIHBdRxXI40'
                                  class='giphy-embed uploadedPicture uplouploadPhotoDivGif createUplouploadPhotoDivGif'
                                ></iframe>
                                <p>
                                  <a
                                    className='uplouploadPhotoDivGif'
                                    href='https://giphy.com/gifs/mashable-3oEjI6SIIHBdRxXI40'
                                  ></a>
                                </p>
                              </div>
                            )}
                            <button
                              onClick={deleteUploadedPicOfForm}
                              className='DeleteEmp deleteUploadedPhotoIcon'
                            >
                              <Trash3Fill size={20} />
                            </button>
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel'>
                              First Name:{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <input
                              type='text'
                              className='detailsInfoInput'
                              name='firstName'
                              value={personalData.firstName}
                              onChange={handleChange}
                              required='true'
                            />
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel'>
                              Middle Name:
                            </label>
                            <br />
                            <input
                              type='text'
                              className='detailsInfoInput'
                              name='middleName'
                              value={personalData.middleName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel'>
                              Last Name:
                            </label>
                            <br />
                            <input
                              className='detailsInfoInput'
                              type='text'
                              name='lastName'
                              value={personalData.lastName}
                              onChange={handleChange}
                            />
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel'>
                              Email: <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <input
                              className='detailsInfoInput'
                              type='email'
                              name='inputEmail'
                              value={personalData.inputEmail}
                              onChange={handleChange}
                              required='true'
                            />
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel'>
                              Phone: <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <input
                              className='detailsInfoInput'
                              type='number'
                              name='phone'
                              value={personalData.phone}
                              onChange={handleChange}
                              required='true'
                            />
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel'>
                              Date of Birth:{" "}
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <input
                              className='detailsInfoInput'
                              type='date'
                              name='dateOfBirth'
                              value={personalData.dateOfBirth}
                              onChange={handleChange}
                              required='true'
                            />
                          </div>

                          <div className='col-md-6 col-sm-6'>
                            <label className='detailsInfoLabel cityLabelForm'>
                              City: <span style={{ color: "red" }}>*</span>
                            </label>
                            <br />
                            <input
                              className='detailsInfoInput'
                              type='text'
                              name='city'
                              value={personalData.city}
                              onChange={handleChange}
                              required='true'
                            />
                          </div>
                          <br />

                          <button
                            type='button'
                            onClick={toggleAdditionalDetails}
                            className='Sec1additionalDetails shiftedSec1additionalDetails'
                          >
                            {showAdditionalDetails
                              ? "Hide All Additional Details"
                              : "Edit Additional Details "}
                          </button>
                        </div>

                        {showAdditionalDetails && (
                          <div className='row'>
                            <div className='col-md-6 col-sm-6'>
                              <label className='detailsInfoLabel'>
                                Address:
                              </label>
                              <br />
                              <input
                                className='detailsInfoInput'
                                type='text'
                                name='address'
                                value={personalData.address}
                                onChange={handleChange}
                              />
                            </div>

                            <div className='col-md-6 col-sm-6'>
                              <label className='detailsInfoLabel'>
                                Postal Code:
                              </label>
                              <br />
                              <input
                                className='detailsInfoInput'
                                type='number'
                                name='postalCode'
                                value={personalData.postalCode}
                                onChange={handleChange}
                              />
                            </div>

                            <div className='col-md-6 col-sm-6'>
                              <label className='detailsInfoLabel'>
                                Driving License:
                              </label>
                              <br />
                              <input
                                className='detailsInfoInput'
                                type='text'
                                name='drivingLicense'
                                value={personalData.drivingLicense}
                                onChange={handleChange}
                              />
                            </div>

                            <div className='col-md-6 col-sm-6'>
                              <label className='detailsInfoLabel'>
                                Nationality:
                              </label>
                              <br />
                              <input
                                className='detailsInfoInput'
                                type='text'
                                name='nationality'
                                value={personalData.nationality}
                                onChange={handleChange}
                              />
                            </div>

                            <div className='col-md-6 col-sm-6'>
                              <label className='detailsInfoLabel'>
                                Place of Birth:
                              </label>
                              <br />
                              <input
                                className='detailsInfoInput'
                                type='text'
                                name='placeOfBirth'
                                value={personalData.placeOfBirth}
                                onChange={handleChange}
                              />
                            </div>

                            <div className='col-md-6 col-sm-6'>
                              <label className='detailsInfoLabel'>
                                Country:
                              </label>
                              <br />
                              <input
                                className='detailsInfoInput'
                                type='text'
                                name='country'
                                value={personalData.country}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        )}
                        <br />
                        <div className='liveInfoOuterDiv'>
                          <h5 className='formSection'>
                            <PenFill color='#35b276' size={24} />{" "}
                            &nbsp;Professional Summary
                            <span style={{ color: "red" }}>*</span>
                          </h5>
                          <div
                            className='aiItAnimationDiv'
                            onClick={() => getSummary()}
                            data-tooltip-id='profInfo'
                            data-tooltip-content='This will cost 3 credits'
                          >
                            <Tooltip id='profInfo' />
                            {aiLoading ? (
                              <iframe
                                src='https://giphy.com/embed/wvtt4mtViPOSrLYNFh'
                                className='bulbGif'
                              ></iframe>
                            ) : (
                              <iframe
                                src='https://giphy.com/embed/2uIlejpr8ZxenICZSN'
                                className='bulbGif'
                              ></iframe>
                            )}
                            {/* <button type='button' onClick={() => getSummary()} className='AIItBtn'>Ai it</button> */}
                          </div>
                          <p className='detailsSubText'>
                            Compose a professional summary to showcase your
                            expertise. For instance: 'Results driven marketing
                            professional with 8 years of experience,excelling in
                            digital strategy and campaign optimization.'
                          </p>
                          <textarea
                            name='professionalSummary'
                            value={personalData.professionalSummary}
                            onChange={handleChange}
                            rows='6'
                            placeholder='Eg: Passionate Software Developer with 8+ years of Building High Enterprise Level Applications'
                            className='detailsTextarea'
                            required='true'
                          ></textarea>
                        </div>

                        <h5 className='formSection'>
                          <JournalBookmarkFill color='#35b276' size={26} />{" "}
                          &nbsp;Employment History
                        </h5>
                        <p className='detailsSubText'>
                          Let's capture your last 10 years of work experience,
                          ensuring your resume reflects your growth,skills and
                          accomplishments effectively.
                        </p>

                        <div
                          class='accordion myAccordian'
                          id='accordionExample'
                        >
                          <div class='accordion-item'>
                            <h2 class='accordion-header'>
                              <button
                                class='accordion-button collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#collapseTwo'
                                aria-expanded='false'
                                aria-controls='collapseTwo'
                              >
                                Add Employment
                              </button>
                            </h2>
                            <div
                              id='collapseTwo'
                              class='accordion-collapse collapse show'
                              data-bs-parent='#accordionExample'
                            >
                              <div class='accordion-body'>
                                {personalData.employmentHistory !== undefined &&
                                  personalData.employmentHistory.length > 0 &&
                                  personalData.employmentHistory.map(
                                    (employment, index) => (
                                      <div
                                        key={index}
                                        className='employmentHistoryDiv'
                                      >
                                        <h5 className='personalSubSubHeading'>
                                          Snapshot {index + 1} :
                                        </h5>
                                        <div className='row'>
                                          {index > 0 && (
                                            <button
                                              type='button'
                                              onClick={() =>
                                                moveEmployment(index, index - 1)
                                              }
                                              className='moveBtnCreateUp'
                                            >
                                              <CaretUpSquareFill
                                                color='#35b276'
                                                size={16}
                                              />
                                            </button>
                                          )}
                                          {index <
                                            personalData.employmentHistory
                                              .length -
                                              1 && (
                                            <button
                                              type='button'
                                              onClick={() =>
                                                moveEmployment(index, index + 1)
                                              }
                                              className='moveBtnCreateDown'
                                            >
                                              <CaretDownSquareFill
                                                color='#35b276'
                                                size={16}
                                              />
                                            </button>
                                          )}

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel'>
                                              Job Title
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={employment.jobTitle}
                                              onChange={(e) =>
                                                updateEmploymentField(
                                                  index,
                                                  "jobTitle",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel'>
                                              Employer
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={employment.employer}
                                              onChange={(e) =>
                                                updateEmploymentField(
                                                  index,
                                                  "employer",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-3'>
                                            <label className='detailsInfoLabel'>
                                              Start Date
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='date'
                                              value={employment.startDate}
                                              style={{
                                                "font-size": "12px",
                                                height: "38px",
                                                marginTop: "10px",
                                              }}
                                              onChange={(e) =>
                                                updateEmploymentField(
                                                  index,
                                                  "startDate",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-3'>
                                            <label className='detailsInfoLabel'>
                                              End Date
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='date'
                                              style={{
                                                "font-size": "12px",
                                                height: "38px",
                                                marginTop: "10px",
                                              }}
                                              value={employment.endDate}
                                              onChange={(e) =>
                                                updateEmploymentField(
                                                  index,
                                                  "endDate",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel cityLabelForm'>
                                              City
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={employment.city}
                                              onChange={(e) =>
                                                updateEmploymentField(
                                                  index,
                                                  "city",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className='liveInfoOuterDiv'>
                                          <label className='detailsInfoLabel'>
                                            Description:
                                          </label>
                                          <div
                                            className=' aiItAnimationDivDesc'
                                            onClick={() => getJD(index)}
                                            data-tooltip-id='descriptionInfo'
                                            data-tooltip-content='This will cost 3 credits'
                                          >
                                            <Tooltip id='descriptionInfo' />
                                            {aiLoading ? (
                                              <iframe
                                                src='https://giphy.com/embed/wvtt4mtViPOSrLYNFh'
                                                className='bulbGif'
                                              ></iframe>
                                            ) : (
                                              <iframe
                                                src='https://giphy.com/embed/2uIlejpr8ZxenICZSN'
                                                className='bulbGif'
                                              ></iframe>
                                            )}
                                          </div>
                                          {/* <button type='button' onClick={() => getSummary()} className='AIItBtn'>Ai it</button> */}
                                        </div>
                                        {/* <button type='button' onClick={() => getJD(index)}> AI it</button> */}
                                        <p className='detailsSubText'>
                                          Provide an overview of your job duties
                                          and responsibilities in your previous
                                          position.This would help us gain a
                                          deeper understanding of your
                                          professional experience.
                                        </p>
                                        <textarea
                                          value={employment.description}
                                          onChange={(e) =>
                                            updateEmploymentField(
                                              index,
                                              "description",
                                              e.target.value
                                            )
                                          }
                                          rows='6 '
                                          cols='76'
                                          placeholder='Eg: I was provided with a range of responsibilities to levarage the digital landscape for brand promotion and lead generation.'
                                          className='detailsTextarea'
                                        />
                                        <br />

                                        <button
                                          type='button'
                                          onClick={() =>
                                            removeEmploymentHistory(index)
                                          }
                                          className='DeleteEmp'
                                        >
                                          <Trash3Fill size={20} />
                                        </button>
                                      </div>
                                    )
                                  )}
                                <button
                                  type='button'
                                  onClick={addEmploymentHistory}
                                  className='Sec1additionalDetails'
                                >
                                  <PlusLg size={20} /> Add One More Employment
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <h5 className='formSection'>
                          <JournalCheck color='#35b276' size={26} />{" "}
                          &nbsp;Education
                        </h5>
                        <p className='detailsSubText'>
                          Share your educational journey,spanning your academic
                          achievements and qualifications, making you an
                          appealing candidate to potential employers.{" "}
                        </p>

                        <div
                          class='accordion myAccordian'
                          id='accordionExample3'
                        >
                          <div class='accordion-item'>
                            <h2 class='accordion-header'>
                              <button
                                class='accordion-button collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#collapseThree'
                                aria-expanded='false'
                                aria-controls='collapseThree'
                              >
                                Add Education
                              </button>
                            </h2>
                            <div
                              id='collapseThree'
                              class='accordion-collapse collapse show'
                              data-bs-parent='#accordionExample3'
                            >
                              <div class='accordion-body'>
                                {personalData.educationHistory !== undefined &&
                                  personalData.educationHistory.length > 0 &&
                                  personalData.educationHistory.map(
                                    (education, index) => (
                                      <div
                                        key={index}
                                        className='employmentHistoryDiv'
                                      >
                                        <h5 className='personalSubSubHeading'>
                                          Formal Education {index + 1} :
                                        </h5>
                                        <div className='row'>
                                          {index > 0 && (
                                            <button
                                              type='button'
                                              onClick={() =>
                                                moveEducation(index, index - 1)
                                              }
                                              className='moveBtnCreateUp'
                                            >
                                              <CaretUpSquareFill
                                                color='#35b276'
                                                size={16}
                                              />
                                            </button>
                                          )}
                                          {index <
                                            personalData.educationHistory
                                              .length -
                                              1 && (
                                            <button
                                              type='button'
                                              onClick={() =>
                                                moveEducation(index, index + 1)
                                              }
                                              className='moveBtnCreateDown'
                                            >
                                              <CaretDownSquareFill
                                                color='#35b276'
                                                size={16}
                                              />
                                            </button>
                                          )}

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel'>
                                              School:
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={education.school}
                                              onChange={(e) =>
                                                updateEducationField(
                                                  index,
                                                  "school",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel'>
                                              Degree:
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={education.degree}
                                              onChange={(e) =>
                                                updateEducationField(
                                                  index,
                                                  "degree",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-3'>
                                            <label className='detailsInfoLabel'>
                                              Start Date:
                                            </label>
                                            <input
                                              className='detailsInfoInput'
                                              type='date'
                                              value={education.startDate}
                                              style={{
                                                "font-size": "12px",
                                                height: "38px",
                                                marginTop: "10px",
                                              }}
                                              onChange={(e) =>
                                                updateEducationField(
                                                  index,
                                                  "startDate",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-3'>
                                            <label className='detailsInfoLabel'>
                                              End Date:
                                            </label>
                                            <input
                                              className='detailsInfoInput'
                                              type='date'
                                              value={education.endDate}
                                              style={{
                                                "font-size": "12px",
                                                height: "38px",
                                                marginTop: "10px",
                                              }}
                                              onChange={(e) =>
                                                updateEducationField(
                                                  index,
                                                  "endDate",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel cityLabelForm'>
                                              City:
                                            </label>
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={education.city}
                                              onChange={(e) =>
                                                updateEducationField(
                                                  index,
                                                  "city",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>

                                        <label className='detailsInfoLabel'>
                                          Description:
                                        </label>
                                        <p className='detailsSubText'>
                                          Provide an overview of your job duties
                                          and responsibilities in your previous
                                          position.This would help us gain a
                                          deeper understanding of your
                                          professional experience.
                                        </p>
                                        <textarea
                                          value={education.description}
                                          onChange={(e) =>
                                            updateEducationField(
                                              index,
                                              "description",
                                              e.target.value
                                            )
                                          }
                                          rows='6 '
                                          cols='76'
                                          placeholder='Eg: Achieved excellence in academics by consistently maintaining a top-ranking position throughout high school. Actively participated in various academic competitions and excelled in subject-specific contests. Received recognition for outstanding performance in science fairs and mathematics Olympiads.'
                                          className='detailsTextarea'
                                        />
                                        <br />

                                        <button
                                          type='button'
                                          onClick={() =>
                                            removeEducationHistory(index)
                                          }
                                          className='DeleteEmp'
                                        >
                                          <Trash3Fill size={20} />
                                        </button>
                                      </div>
                                    )
                                  )}

                                <button
                                  type='button'
                                  onClick={addEducationHistory}
                                  className='Sec1additionalDetails'
                                >
                                  <PlusLg size={20} /> Add One More Education
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* *******************************New******************************* */}

                        <h5 className='formSection'>
                          <Link45deg color='#35b276' size={26} /> &nbsp;Websites
                          and Links
                        </h5>
                        <p className='detailsSubText'>
                          Elevate your resume with real-world examples of your
                          work. You can include Personal-websites,
                          portfolios,and project repositories to demonstrate
                          your skills and experience.{" "}
                        </p>

                        <div
                          class='accordion myAccordian'
                          id='accordionExample3'
                        >
                          <div class='accordion-item'>
                            <h2 class='accordion-header'>
                              <button
                                class='accordion-button collapsed'
                                type='button'
                                data-bs-toggle='collapse'
                                data-bs-target='#collapseThree'
                                aria-expanded='false'
                                aria-controls='collapseThree'
                              >
                                Add Websites
                              </button>
                            </h2>
                            <div
                              id='collapseThree'
                              class='accordion-collapse collapse show'
                              data-bs-parent='#accordionExample3'
                            >
                              <div class='accordion-body'>
                                {personalData.websitesAndLinks !== undefined &&
                                  personalData.websitesAndLinks.length > 0 &&
                                  personalData.websitesAndLinks.map(
                                    (websites, index) => (
                                      <div
                                        key={index}
                                        className='employmentHistoryDiv'
                                      >
                                        <h5 className='personalSubSubHeading'>
                                          Site {index + 1} :
                                        </h5>
                                        <div
                                          className='row'
                                          style={{ position: "relative" }}
                                        >
                                          {index > 0 && (
                                            <button
                                              type='button'
                                              onClick={() =>
                                                moveWebsiteLink(
                                                  index,
                                                  index - 1
                                                )
                                              }
                                              className='moveBtnCreateUp moveBtnCreateWebsiteUp'
                                            >
                                              <CaretUpSquareFill
                                                color='#35b276'
                                                size={14}
                                              />
                                            </button>
                                          )}
                                          {index <
                                            personalData.websitesAndLinks
                                              .length -
                                              1 && (
                                            <button
                                              type='button'
                                              onClick={() =>
                                                moveWebsiteLink(
                                                  index,
                                                  index + 1
                                                )
                                              }
                                              className='moveBtnCreateDown moveBtnCreateWebsiteDown'
                                            >
                                              <CaretDownSquareFill
                                                color='#35b276'
                                                size={14}
                                              />
                                            </button>
                                          )}

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel'>
                                              Name :
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={websites.name}
                                              onChange={(e) =>
                                                updateWebsiteLinkField(
                                                  index,
                                                  "name",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>

                                          <div className='col-md-6'>
                                            <label className='detailsInfoLabel'>
                                              Url:
                                            </label>
                                            <br />
                                            <input
                                              className='detailsInfoInput'
                                              type='text'
                                              value={websites.url}
                                              onChange={(e) =>
                                                updateWebsiteLinkField(
                                                  index,
                                                  "url",
                                                  e.target.value
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                        <button
                                          type='button'
                                          onClick={() =>
                                            removeWebsiteLink(index)
                                          }
                                          className='DeleteEmp'
                                        >
                                          <Trash3Fill size={20} />
                                        </button>
                                      </div>
                                    )
                                  )}

                                <button
                                  type='button'
                                  onClick={addWebsiteLink}
                                  className='Sec1additionalDetails'
                                >
                                  <PlusLg size={20} /> Add Website
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* ************************************************************************************** */}

                        <div className='liveInfoOuterDiv'>
                          <div className='skillsSection'>
                            <h5 className='formSection'>
                              <TrophyFill color='#35b276' size={24} /> &nbsp;
                              Add your Skills
                            </h5>
                            <p className='detailsSubText'>
                              Highlight your core strengths and expertise.
                              Create and add skills that best suit your position
                              and represent your capabilities, enhancing your
                              resume.
                            </p>
                            <div
                              className='aiItAnimationDiv'
                              onClick={() => getAiSkills()}
                              data-tooltip-id='skillsInfo'
                              data-tooltip-content='This will cost you 3 credits'
                            >
                              {" "}
                              <Tooltip id='skillsInfo' />
                              {aiLoading ? (
                                <iframe
                                  src='https://giphy.com/embed/wvtt4mtViPOSrLYNFh'
                                  className='bulbGif'
                                ></iframe>
                              ) : (
                                //    <iframe src="https://giphy.com/embed/gJ3mEToTDJn3LT6kCT" className="bulbGif"></iframe>

                                // <iframe src="https://giphy.com/embed/pylpD8AoQCf3CQ1oO2" className="bulbGif"></iframe>
                                <iframe
                                  src='https://giphy.com/embed/2uIlejpr8ZxenICZSN'
                                  className='bulbGif'
                                ></iframe>
                              )}
                              {/* <iframe src="https://giphy.com/embed/pylpD8AoQCf3CQ1oO2" class="giphy-embed bulbGif "></iframe><p><a href="https://giphy.com/embed/pylpD8AoQCf3CQ1oO2"></a></p> */}
                              {/* <button type='button' onClick={() => getSummary()} className='AIItBtn'>Ai it</button> */}
                            </div>
                          </div>
                          {/* <button type='button' onClick={() => getAiSkills()}>Ai it</button> */}
                          <div>
                            <input
                              className='detailsInfoInput createLiveSearchDetailsInfoInput'
                              type='text'
                              placeholder='Add a skill...'
                              value={options}
                              onChange={(e) => setOptions(e.target.value)}
                            />
                            <button
                              type='button'
                              onClick={handleAddSkill}
                              className='addSkillBtn zoom'
                            >
                              <PlusCircleFill /> &nbsp;Add Skill
                            </button>
                          </div>
                          <div>
                            <h6 className='formSection SkillsadditionalDetails'>
                              Selected Skills:
                            </h6>
                            {selectedOptions.map((skill, index) => (
                              <div
                                key={index}
                                className='selected-option selectedOption'
                              >
                                {/* {skill} */}
                                {skill.charAt(0).toUpperCase() + skill.slice(1)}
                                <button
                                  type='button'
                                  onClick={() => handleRemoveSkill(skill)}
                                  className='DeleteSkill'
                                >
                                  <Trash3Fill size={16} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* <div className='skillsSection'>
                                        <h5 className='formSection'><TrophyFill color="#35b276" size={24} /> &nbsp;Add your Skills</h5>
                                        <p className='detailsSubText'> Highlight your core strengths and expertise. Select up to 6 key skills that best suit your the position you want to apply to and represent your capabilities, enhancing your resume.</p>
                                        <div>
                                            <input
                                                className='detailsInfoInput searchDetailsInfoInput'
                                                type="text"
                                                placeholder="Search..."
                                                value={searchText}
                                                onChange={handleSearchTextChange}
                                            />
                                            {showDropdown && (
                                                <div className="dropdown">
                                                    <div className="scrollable-dropdown">
                                                        {filteredOptions.map((option, index) => (
                                                            <div
                                                                key={index}
                                                                className="dropdown-option"
                                                                onClick={() => handleOptionClick(option)}
                                                            >
                                                                {option}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h6 className='formSection SkillsadditionalDetails'>Selected Skills:</h6>
                                            {selectedOptions.map((option, index) => (
                                                <div key={index} className="selected-option selectedOption ">
                                                    {option}
                                                    <button onClick={() => handleRemoveOption(option)} className="DeleteSkill"> <Trash3Fill size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div> */}

                        <CustomSection
                          courses={courses}
                          setCourses={setCourses}
                          activities={activities}
                          setActivities={setActivities}
                          internships={internships}
                          setInternships={setInternships}
                          hobbies={hobbies}
                          setHobbies={setHobbies}
                          languages={languages}
                          setLanguages={setLanguages}
                          references={references}
                          setReferences={setReferences}
                          customSections={customSections}
                          setCustomSections={setCustomSections}
                          liveForm={"true"}
                        />
                        <div className='createSaveProfileDiv'>
                          <button
                            type='submit'
                            className='saveProfileBtn createLiveSaveProfileBtn'
                          >
                            <Check2Circle size={26} />
                            &nbsp;&nbsp;&nbsp;Save Resume
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div
                  className='rightDivCreateLive'
                  style={{
                    flex: 1,
                    position: "fixed",
                    width: "50%",
                    right: "0%",
                    top: "0%",
                    paddingTop: "5%",
                  }}
                >
                  <div className='  createRightDiv'>
                    <div className='pdfDisplayDiv'>
                      {selectedTemplateId == 1 && (
                        <MyPdfViewer1
                          personalData={personalData}
                          live={true}
                          courses={courses}
                          activities={activities}
                          internships={internships}
                          hobbies={hobbies}
                          languages={languages}
                          references={references}
                          customSections={customSections}
                          skills={selectedOptions}
                          jobTitle={jobTitle}
                        />
                      )}
                      {selectedTemplateId == 2 && (
                        <MyPdfViewer2
                          personalData={personalData}
                          live={true}
                          courses={courses}
                          activities={activities}
                          internships={internships}
                          hobbies={hobbies}
                          languages={languages}
                          references={references}
                          customSections={customSections}
                          skills={selectedOptions}
                          jobTitle={jobTitle}
                        />
                      )}
                      {selectedTemplateId == 3 && (
                        <MyPdfViewer3
                          personalData={personalData}
                          live={true}
                          courses={courses}
                          activities={activities}
                          internships={internships}
                          hobbies={hobbies}
                          languages={languages}
                          references={references}
                          customSections={customSections}
                          skills={selectedOptions}
                          jobTitle={jobTitle}
                        />
                      )}
                      {selectedTemplateId == 4 && (
                        <MyPdfViewer4
                          personalData={personalData}
                          live={true}
                          courses={courses}
                          activities={activities}
                          internships={internships}
                          hobbies={hobbies}
                          languages={languages}
                          references={references}
                          customSections={customSections}
                          skills={selectedOptions}
                          jobTitle={jobTitle}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* <PDFDownloadLink document={<MyPdfViewerTest name={"NAMES"} photo={imgFile} />} fileName='Resume'>
                                    {({loading})=>(loading? <button type='button'>loading Document...</button>: <button type='button'>Download</button>)}
                            </PDFDownloadLink> */}
                {/* <button onClick={() => handleDownload()} className="downloadPdfBtn zoom" disabled={photoLoader}><FileEarmarkArrowDownFill className="downloadPDFIcon" size={26} style={{zIndex:18}}/>Download PDF</button> */}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

// Helper function to generate a large list of options for testing
function generateOptions() {
  const options = [];
  for (let i = 1; i <= 200; i++) {
    options.push(`Skill ${i}`);
  }
  return options;
}
