import React, { useState, useEffect } from 'react';
import {CaretDownSquareFill,CaretUpSquareFill, Check2Circle, Check2All, Check, PersonCheck, PersonSquare, CaretDownSquare, JournalBookmarkFill, PenFill, Trash3Fill, PlusLg, JournalCheck, Link45deg, TrophyFill } from "react-bootstrap-icons";
import CustomSection from './formComponents/customSection';
import { updateUserProfileInDatabase, updateUserPhotoInDatabase, uploadMedia, addUserResume } from '../fireabse';
import { useDispatch, useSelector } from 'react-redux';
import { saveResume, updatePhoto, updateProfile, updateUser } from '../redux/slices/user';
import skills from '../components/formComponents/skills';
import { useNavigate } from 'react-router-dom'
import SkillsForm from './skillsForm';
import { PlusCircleFill } from "react-bootstrap-icons";


export default function Form({personalData, setPersonalData}) {
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [internships, setInternships] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [references, setReferences] = useState([]);
  const [customSections, setCustomSections] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState(personalData.skills);
  const [options, setOptions] = useState('');
  const [searchText, setSearchText] = useState('');
  const [photoLoader, setPhotoLoader] = useState(false);
  const [customDetails, setCustomDetails] = useState({
    courses: [],
    activities: [],
    internships: [],
    hobbies: [],
    languages: [],
    references: [],
    customSections: [],
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [uploadedPhotoDataURL, setUploadedPhotoDataURL] = useState('');
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  // const [personalData, setPersonalData] = useState({
  //   jobTitle: '',
  //   firstName: '',
  //   middleName: '',
  //   lastName: '',
  //   inputEmail: '',
  //   phone: '',
  //   dateOfBirth: '',
  //   city: '',
  //   address: '',
  //   postalCode: '',
  //   drivingLicense: '',
  //   nationality: '',
  //   placeOfBirth: '',
  //   country: '',
  //   professionalSummary: '',
  //   uploadedPhotoURL: '',
  //   employmentHistory: [
  //     {
  //       jobTitle: '',
  //       employer: '',
  //       startDate: '',
  //       endDate: '',
  //       city: '',
  //       description: '',
  //     },
  //   ],
  //   educationHistory: [
  //     {
  //       school: '',
  //       degree: '',
  //       startDate: '',
  //       endDate: '',
  //       city: '',
  //       description: '',
  //     },
  //   ],
  //   websitesAndLinks: [
  //     {
  //       name: '',
  //       url: '',
  //     },
  //   ],

  // });

  useEffect(() => {
    if(personalData.skills && personalData.skills.length>0){
      setSelectedOptions(personalData.skills)
    }
  }, [personalData]);

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
    console.log('Selected Skills:', selectedOptions);
  }, [selectedOptions]);


    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleAddSkill = () => {
      if (options.trim() !== "") {
        setPersonalData((prevData) => ({
          ...prevData,
          skills: [
            ...prevData.skills,
            options
          ],
        }));
        // setSelectedOptions([...selectedOptions, options]);
        setOptions("");
      }
    };
  
    const handleRemoveSkill = (skillToRemove) => {
      const updatedSkills = selectedOptions.filter(
        (skill) => skill !== skillToRemove
      );
  
      // setSelectedOptions(updatedSkills);
      setPersonalData((prevData) => ({
        ...prevData,
        skills: updatedSkills
      }));
  
      if(updatedSkills.length == 0){
        setSelectedOptions([]);
      }
    };
  



{/* ********************************OLD SKILLS SECTION**************************************** */}

  // const handleSearchTextChange = (e) => {
  //   const text = e.target.value;
  //   setSearchText(text);
  //   setShowDropdown(true);
  // };
  
  // const handleOptionClick = (option) => {
  //   if (!selectedOptions.includes(option)) {
  //     setSelectedOptions([...selectedOptions, option]);
  //     setSearchText('');
  //   }
  // };

  // const handleRemoveOption = (optionToRemove) => {
  //   const updatedSelectedOptions = selectedOptions.filter(
  //     (option) => option !== optionToRemove
  //   );
  //   setSelectedOptions(updatedSelectedOptions);
  // };

{/* ********************************OLD SKILLS SECTION**************************************** */}


  const filteredOptions = selectedOptions.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );


  // const addWebsiteOrLink = () => {
  //   setPersonalData((prevData) => ({
  //     ...prevData,
  //     websitesAndLinks: [
  //       ...prevData.websitesAndLinks,
  //       {
  //         name: '',
  //         url: '',
  //       },
  //     ],
  //   }));
  // };

  // const removeWebsiteOrLink = (index) => {
  //   setPersonalData((prevData) => {
  //     const updatedWebsitesAndLinks = [...prevData.websitesAndLinks];
  //     updatedWebsitesAndLinks.splice(index, 1);
  //     return {
  //       ...prevData,
  //       websitesAndLinks: updatedWebsitesAndLinks,
  //     };
  //   });
  // };

  // const updateWebsiteOrLinkField = (index, field, value) => {
  //   setPersonalData((prevData) => {
  //     const updatedWebsitesAndLinks = [...prevData.websitesAndLinks];
  //     updatedWebsitesAndLinks[index][field] = value;
  //     return {
  //       ...prevData,
  //       websitesAndLinks: updatedWebsitesAndLinks,
  //     };
  //   });
  // };

  const addWebsiteLink = () => {
    setPersonalData((prevData) => ({
                ...prevData,
                websitesAndLinks: [
                    ...prevData.websitesAndLinks,
                    {
                        name: '',
                        url: '',
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
                updatedWebsitesLinks = [...updatedWebsitesLinks, temp]
            })
            setPersonalData((prevData) => {
                return {
                    ...prevData,
                    websitesAndLinks: updatedWebsitesLinks,
                };
            });
        }

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
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          city: '',
          description: '',
        },
      ]
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
    setPersonalData((prevData) => {
      const updatedEducationHistory = [...prevData.educationHistory];
      updatedEducationHistory[index][field] = value;
      return {
        ...prevData,
        educationHistory: updatedEducationHistory,
      };
    });
  };

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
          jobTitle: '',
          employer: '',
          startDate: '',
          endDate: '',
          city: '',
          description: '',
        },
      ],
    });
  };

  const removeEmploymentHistory = (index) => {
    setPersonalData((prevData) => {
      const updatedEmploymentHistory = [...prevData.employmentHistory];
      updatedEmploymentHistory.splice(index, 1);
      return {
        ...prevData,
        employmentHistory: updatedEmploymentHistory,
      };
    });
  };

  const updateEmploymentField = (index, field, value) => {
    setPersonalData((prevData) => {
      const updatedEmploymentHistory = [...prevData.employmentHistory];
      updatedEmploymentHistory[index][field] = value;
      return {
        ...prevData,
        employmentHistory: updatedEmploymentHistory,
      };
    });
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
    console.log(personalData)
    console.log(customDetails)
    var profile = {
      ...personalData,
      skills: selectedOptions,
      customDetails,
      profile:true
    }
    console.log("Login email  " + user.email)
    await updateUserProfileInDatabase(user.email, profile)
    var resume = {
      ...personalData,
      skills: selectedOptions,
      customDetails,
      resumeId: 1,
      id: 'id' + (new Date()).getTime()
  }

  var resumes = [resume]

  dispatch(saveResume(resume));
  await addUserResume(user.email, resumes);
    dispatch(updateUser(profile));
    navigate("/dashboard")

  };


  const toggleAdditionalDetails = () => {
    setShowAdditionalDetails(!showAdditionalDetails);
  };


  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setPhotoLoader(true);
      const photoFile = files[0];

      //To  Display the uploaded photo
      if (photoFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedPhotoDataURL()
          const uploadedPhotoDataURL = e.target.result;
        };
        const photoFileLink = await uploadMedia(photoFile, "profilePhoto");
        console.log(photoFileLink)
        setPersonalData({
          ...personalData,
          uploadedPhotoURL: photoFileLink,
        })
        await updateUserPhotoInDatabase(user.email, photoFileLink)
        dispatch(updatePhoto(photoFileLink))
        reader.readAsDataURL(photoFile);
        console.log("my phtoo ", photoFileLink)
        setPhotoLoader(false);
      }
    } else {
      setPersonalData({
        ...personalData,
        [name]: value,
      });
    }
  };


  return (
    <div>
      <h5 className='formSection'><PersonCheck color="#35b276" size={40} /> &nbsp;Personal Details</h5>
      <form onSubmit={handleLogDetails}>
        <div className='row'>

          <div className='col-md-4'>
            <label className='detailsInfoLabel'>
              Current Position <span style={{color:'red'}}>*</span>
            </label>
            <br />
            <input className='detailsInfoInput'  type="text" name="jobTitle" value={personalData.jobTitle} onChange={handleChange} required='true'  />
          </div>

          {/* <div className='col-md-8 uplouploadPictureBigDiv'>

            <label className='detailsInfoLabel uplouploadPictureDivLabel'>
              Upload Photo
            </label>
            <input type="file" className='detailsInfoInput uploadPictureInput formUploadPictureInput' name="photo" accept="image/*" onChange={handleChange} />

            {(personalData.uploadedPhotoURL == '' && !photoLoader) && <div className='dottedDiv' ><PersonSquare size={90} className="uplouploadPhotoDivIcon" /></div>}
            {!photoLoader && personalData.uploadedPhotoURL && (
              <div className='uplouploadPhotoDiv'>
                <img src={personalData.uploadedPhotoURL} className="uploadedPicture" alt="Uploaded" width="110" />
              </div>
            )}
            {photoLoader && (
              <div className='uplouploadPhotoDivGif'>
                <iframe src="https://giphy.com/embed/y1ZBcOGOOtlpC" class="giphy-embed uploadedPicture uplouploadPhotoDivGif" ></iframe><p><a className='uplouploadPhotoDivGif' href="https://giphy.com/gifs/foosball-y1ZBcOGOOtlpC"></a></p>
              </div>
            )}
          </div> */}

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              First Name: <span style={{color:'red'}}>*</span>
            </label>
            <br />
            <input type="text" className='detailsInfoInput' name="firstName" value={personalData.firstName} onChange={handleChange} required='true' />
          </div>

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              Middle Name:
            </label>
            <br />
            <input type="text" className='detailsInfoInput' name="middleName" value={personalData.middleName} onChange={handleChange} />
          </div>

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              Last Name:
            </label>
            <br />
            <input className='detailsInfoInput' type="text" name="lastName" value={personalData.lastName} onChange={handleChange} />
          </div>

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              Email: <span style={{color:'red'}}>*</span>
            </label>
            <br />
            <input className='detailsInfoInput' type="email" name="inputEmail" value={personalData.inputEmail} onChange={handleChange} required='true'/>
          </div>

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              Phone: <span style={{color:'red'}}>*</span>
            </label>
            <br />
            <input className='detailsInfoInput' type="number" name="phone" value={personalData.phone} onChange={handleChange} required='true' />
          </div>

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              Date of Birth: <span style={{color:'red'}}>*</span>
            </label>
            <br />
            <input className='detailsInfoInput' type="date" name="dateOfBirth" value={personalData.dateOfBirth} onChange={handleChange} required='true'/>
          </div>

          <div className='col-md-4 col-sm-6'>
            <label className='detailsInfoLabel'>
              City: <span style={{color:'red'}}>*</span>
            </label>
            <br />
            <input className='detailsInfoInput' type="text" name="city" value={personalData.city} onChange={handleChange} required='true'/>
          </div>
          <br />

          {/* Edit additional details */}
          <button type="button" onClick={toggleAdditionalDetails} className="Sec1additionalDetails shiftedSec1additionalDetails">
            {showAdditionalDetails ? 'Hide All Additional Details' : 'Edit Additional Details '}
          </button>
        </div>

        {/* Additional input fields */}
        {showAdditionalDetails && (
          <div className='row'>

            <div className='col-md-4 col-sm-6'>
              <label className='detailsInfoLabel'>
                Address:
              </label>
              <br />
              <input className='detailsInfoInput' type="text" name="address" value={personalData.address} onChange={handleChange} />
            </div>

            <div className='col-md-4 col-sm-6'>
              <label className='detailsInfoLabel'>
                Postal Code:
              </label>
              <br />
              <input className='detailsInfoInput' type="number" name="postalCode" value={personalData.postalCode} onChange={handleChange} />
            </div>

            <div className='col-md-4 col-sm-6'>
              <label className='detailsInfoLabel'>
                Driving License:
              </label>
              <br />
              <input className='detailsInfoInput' type="text" name="drivingLicense" value={personalData.drivingLicense} onChange={handleChange} />
            </div>

            <div className='col-md-4 col-sm-6'>
              <label className='detailsInfoLabel'>
                Nationality:
              </label>
              <br />
              <input className='detailsInfoInput' type="text" name="nationality" value={personalData.nationality} onChange={handleChange} />
            </div>

            <div className='col-md-4 col-sm-6'>
              <label className='detailsInfoLabel'>
                Place of Birth:
              </label>
              <br />
              <input className='detailsInfoInput' type="text" name="placeOfBirth" value={personalData.placeOfBirth} onChange={handleChange} />
            </div>

            <div className='col-md-4 col-sm-6'>
              <label className='detailsInfoLabel'>
                Country:
              </label>
              <br />
              <input className='detailsInfoInput' type="text" name="country" value={personalData.country} onChange={handleChange} />
            </div>
          </div>
        )}
        <br />

        <h5 className='formSection'><PenFill color="#35b276" size={24} /> &nbsp;Professional Summary <span style={{color:'red'}}>*</span></h5>
        <p className='detailsSubText'>Compose a professional summary to showcase your expertise. For instance: 'Results driven marketing professional with 8 years of experience,excelling in digital strategy and campaign optimization.'</p>
        <textarea
          name="professionalSummary"
          value={personalData.professionalSummary}
          onChange={handleChange}
          rows="6"
          placeholder='Eg: Passionate Software Developer with 8+ years of Building High Enterprise Level Applications'
          className='detailsTextarea'
          required='true'
        ></textarea>


        <h5 className='formSection'><JournalBookmarkFill color="#35b276" size={26} /> &nbsp;Employment History</h5>
        <p className='detailsSubText'>Let's capture your last 10 years of work experience, ensuring your resume reflects your growth,skills and accomplishments effectively.</p>

        <div class="accordion myAccordian" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button"  data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Add Employment
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse " data-bs-parent="#accordionExample">

              <div class="accordion-body">
                {personalData.employmentHistory!==undefined && personalData.employmentHistory.length>0 && personalData.employmentHistory.map((employment, index) => (
                  <div key={index} className="employmentHistoryDiv">
                    <h5 className='personalSubSubHeading'>Role {index + 1} :</h5>
                    <div className='row'>
                    {index > 0 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveEmployment(index, index - 1)}
                                                                                className="moveBtnCreateUp"
                                                                            >
                                                                               <CaretUpSquareFill color="#35b276" size={22} /> 
                                                                            </button>
                                                                        )}
                                                                        {index < personalData.employmentHistory.length - 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveEmployment(index, index + 1)}
                                                                                className="moveBtnCreateDown"
                                                                            >
                                                                                 <CaretDownSquareFill color="#35b276" size={22} />
                                                                            </button>
                                                                        )}

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          Job Title
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="text"
                          value={employment.jobTitle}
                          onChange={(e) => updateEmploymentField(index, 'jobTitle', e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          Employer
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="text"
                          value={employment.employer}
                          onChange={(e) => updateEmploymentField(index, 'employer', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className='detailsInfoLabel'>
                          Start Date
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="date"
                          value={employment.startDate}
                          style={{ "font-size": "12px", "height": "38px", "marginTop": "10px" }}
                          onChange={(e) => updateEmploymentField(index, 'startDate', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className='detailsInfoLabel'>
                          End Date
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="date"
                          style={{ "font-size": "12px", "height": "38px", "marginTop": "10px" }}
                          value={employment.endDate}
                          onChange={(e) => updateEmploymentField(index, 'endDate', e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          City
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="text"
                          value={employment.city}
                          onChange={(e) => updateEmploymentField(index, 'city', e.target.value)}
                        />
                      </div>
                    </div>

                    <label className='detailsInfoLabel'>
                      Description:
                    </label>

                    <p className='detailsSubText'>Provide an overview of your job duties and responsibilities in your previous position.This would help us gain a deeper understanding of your professional experience.</p>
                    <textarea
                      value={employment.description}
                      onChange={(e) => updateEmploymentField(index, 'description', e.target.value)}
                      rows="6 "
                      cols="76"
                      placeholder='Eg: I was provided with a range of responsibilities to levarage the digital landscape for brand promotion and lead generation.'
                      className='detailsTextarea'
                    />
                    <br />

                    <button type="button" onClick={() => removeEmploymentHistory(index)} className="DeleteEmp">
                      <Trash3Fill size={20} />
                    </button>
                  </div>

                ))}
                <button type="button" onClick={addEmploymentHistory} className="Sec1additionalDetails">
                  <PlusLg size={20} /> Add One More Employment
                </button>
              </div>
            </div>
          </div>
        </div>

        <h5 className='formSection'><JournalCheck color="#35b276" size={26} /> &nbsp;Education</h5>
        <p className='detailsSubText'>Share your educational journey,spanning your academic achievements and qualifications, making you an appealing candidate to potential employers. </p>

        <div class="accordion myAccordian" id="accordionExample3">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button"  data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Add Education
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse " data-bs-parent="#accordionExample3">
              <div class="accordion-body">

                {personalData.educationHistory !==undefined && personalData.educationHistory.length>0 && personalData.educationHistory.map((education, index) => (
                  <div key={index} className="employmentHistoryDiv">
                    <h5 className='personalSubSubHeading'>Institute {index + 1} :</h5>
                    <div className='row'>
                    {index > 0 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveEducation(index, index - 1)}
                                                                                className="moveBtnCreateUp"
                                                                                >
                                                                                   <CaretUpSquareFill color="#35b276" size={22} /> 
                                                                            </button>
                                                                        )}
                                                                        {index < personalData.educationHistory.length - 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveEducation(index, index + 1)}
                                                                                className="moveBtnCreateDown"
                                                                                >
                                                                                     <CaretDownSquareFill color="#35b276" size={22} />
                                                                            </button>
                                                                        )}

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          School:
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="text"
                          value={education.school}
                          onChange={(e) => updateEducationField(index, 'school', e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          Degree:
                        </label>
                        <br />
                        <input
                          className='detailsInfoInput' type="text"
                          value={education.degree}
                          onChange={(e) => updateEducationField(index, 'degree', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className='detailsInfoLabel'>
                          Start Date:
                        </label>
                        <input
                          className='detailsInfoInput' type="date"
                          value={education.startDate}
                          style={{ "font-size": "12px", "height": "38px", "marginTop": "10px" }}
                          onChange={(e) => updateEducationField(index, 'startDate', e.target.value)}
                        />
                      </div>

                      <div className="col-md-3">
                        <label className='detailsInfoLabel'>
                          End Date:
                        </label>
                        <input
                          className='detailsInfoInput' type="date"
                          value={education.endDate}
                          style={{ "font-size": "12px", "height": "38px", "marginTop": "10px" }}
                          onChange={(e) => updateEducationField(index, 'endDate', e.target.value)}
                        />
                      </div>

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          City:
                        </label>
                        <input
                          className='detailsInfoInput' type="text"
                          value={education.city}
                          onChange={(e) => updateEducationField(index, 'city', e.target.value)}
                        />
                      </div>
                    </div>

                    <label className='detailsInfoLabel'>
                      Description:
                    </label>
                    <p className='detailsSubText'>Provide an overview of your job duties and responsibilities in your previous position.This would help us gain a deeper understanding of your professional experience.</p>
                    <textarea
                      value={education.description}
                      onChange={(e) => updateEducationField(index, 'description', e.target.value)}
                      rows="6 "
                      cols="76"
                      placeholder='Eg: I was provided with a range of responsibilities to levarage the digital landscape for brand promotion and lead generation.'
                      className='detailsTextarea'
                    />
                    <br />

                    <button type="button" onClick={() => removeEducationHistory(index)} className="DeleteEmp">
                      <Trash3Fill size={20} />
                    </button>
                  </div>
                ))}

                <button type="button" onClick={addEducationHistory} className="Sec1additionalDetails">
                  <PlusLg size={20} /> Add One More Education
                </button>
              </div>
            </div>
          </div>
        </div>



        <h5 className='formSection'><Link45deg color="#35b276" size={26} /> &nbsp;Websites and Links</h5>
        <p className='detailsSubText'>Elevate your resume with real-world examples of your work. You can include Personal-websites, portfolios,and project repositories to demonstrate your skills and experience.  </p>
                                    <div class="accordion myAccordian" id="accordionExample4">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header">
                                                <button class="accordion-button " type="button"  data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                                    Add Website or Link
                                                </button>
                                            </h2>
                                            <div id="collapseFour" class="accordion-collapse " data-bs-parent="#accordionExample4">
                                                <div class="accordion-body">

                                                    {personalData.websitesAndLinks!==undefined && personalData.websitesAndLinks.length >0 && personalData.websitesAndLinks.map((websiteLink, index) => (
                                                        <div key={index} className="websitesLinksDiv">
                                                            <h5 className='personalSubSubHeading'>Link {index + 1} :</h5>
                                                            <div className='row'  style={{"position":"relative"}}>
                                                            {index > 0 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveWebsiteLink(index, index - 1)}
                                                                                className="moveBtnCreateUp moveBtnCreateWebsiteUp"
                                                                            >
                                                                                <CaretUpSquareFill color="#35b276" size={20} />
                                                                            </button>
                                                                        )}
                                                                        {index < personalData.websitesAndLinks.length - 1 && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={() => moveWebsiteLink(index, index + 1)}
                                                                                className="moveBtnCreateDown moveBtnCreateWebsiteDown"
                                                                            >
                                                                                <CaretDownSquareFill color="#35b276" size={20} />
                                                                            </button>
                                                                        )}

                                                                <div className="col-md-6">
                                                                    <label className='detailsInfoLabel'>
                                                                        Name:
                                                                    </label>
                                                                    <br />
                                                                    <input
                                                                        className='detailsInfoInput'
                                                                        type="text"
                                                                        value={websiteLink.name}
                                                                        onChange={(e) => updateWebsiteLinkField(index, 'name', e.target.value)}
                                                                    />
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <label className='detailsInfoLabel'>
                                                                        URL:
                                                                    </label>
                                                                    <br />
                                                                    <input
                                                                        className='detailsInfoInput'
                                                                        type="text"
                                                                        value={websiteLink.url}
                                                                        onChange={(e) => updateWebsiteLinkField(index, 'url', e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <button
                                                                type="button"
                                                                onClick={() => removeWebsiteLink(index)}
                                                                className="DeleteEmp"
                                                            >
                                                                <Trash3Fill size={20} />
                                                            </button>
                                                        </div>
                                                    ))}

                                                    <button
                                                        type="button"
                                                        onClick={addWebsiteLink}
                                                        className="Sec1additionalDetails"
                                                    >
                                                        <PlusLg size={20} /> Add One More Website/Link
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

        {/* <div class="accordion myAccordian" id="accordionExample4">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                Add Your Links
              </button>
            </h2>
            <div id="collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionExample4">
              <div class="accordion-body ">
                {personalData.websitesAndLinks.map((websiteOrLink, index) => (
                  <div key={index} className="webisteDiv">
                    <h5 className='personalSubSubHeading'>Site {index + 1} :</h5>
                    <div className='row'>

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          Name:
                        </label>
                    
                        <input
                          className='detailsInfoInput' type="text"
                          value={websiteOrLink.name}
                          onChange={(e) => (index, 'name', e.target.value)}
                        />updateWebsiteOrLinkField

                      </div>

                      <div className="col-md-6">
                        <label className='detailsInfoLabel'>
                          URL:
                        </label>
                        <input
                          className='detailsInfoInput' type="url"
                          value={websiteOrLink.url}
                          onChange={(e) => updateWebsiteOrLinkField(index, 'url', e.target.value)}
                        />
                      </div>
                    </div>
                    <button type="button" onClick={() => removeWebsiteOrLink(index)} className="DeleteEmp">
                      <Trash3Fill size={20} />
                    </button>
                  </div>
                ))}
                <button type="button" onClick={addWebsiteOrLink} className="Sec1additionalDetails">
                  <PlusLg size={20} /> Add One More Link
                </button>

              </div>
            </div>
          </div>
        </div> */}

        <div className='skillsSection'>
            <h5 className='formSection'>
            <TrophyFill color="#35b276" size={24} /> &nbsp;
                Add your Skills
            </h5>
            <p className='detailsSubText'>
                Highlight your core strengths and expertise. Create and add skills that best suit your position and represent your capabilities, enhancing your resume.
            </p>
            <div>
                <input
                    className='detailsInfoInput searchDetailsInfoInput'
                    type="text"
                    placeholder="Add a skill..."
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                />
                <button type="button" onClick={handleAddSkill} className='addSkillBtn zoom'><PlusCircleFill/> &nbsp;Add Skill</button>

            </div>
            <div>
                <h6 className='formSection SkillsadditionalDetails'>
                    Selected Skills:
                </h6>
                { selectedOptions.map((skill, index) => (
                    <div key={index} className="selected-option selectedOption">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill(skill)} className="DeleteSkill">
                        <Trash3Fill size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>


{/* ********************************OLD SKILLS SECTION**************************************** */}
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
{/* ********************************OLD SKILLS SECTION**************************************** */}

<CustomSection courses={courses} setCourses={setCourses} activities={activities} setActivities={setActivities} internships={internships} setInternships={setInternships} hobbies={hobbies} setHobbies={setHobbies} languages={languages} setLanguages={setLanguages} references={references} setReferences={setReferences} customSections={customSections} setCustomSections={setCustomSections} liveForm={"false"}/>
        <div className='saveProfileDiv'>
          <button type="submit"  className="saveProfileBtn zoom">
            <Check2Circle size={26} />&nbsp;&nbsp;&nbsp;Save My Profile
          </button>
        </div>

      </form>
    </div>
  );
}


// Helper function to generate a large list of options for testing
function generateOptions() {
  const options = [];
  for (let i = 1; i <= 200; i++) {
    options.push(`Option ${i}`);
  }
  return options;
}



