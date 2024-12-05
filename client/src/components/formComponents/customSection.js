import React, { useRef, useState } from "react";
import {
  Check2Circle,
  PlusLg,
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

export default function CustomSection({
  courses,
  setCourses,
  activities,
  setActivities,
  internships,
  setInternships,
  hobbies,
  setHobbies,
  languages,
  setLanguages,
  references,
  setReferences,
  customSections,
  setCustomSections,
  liveForm,
}) {
  const courseRef = useRef(null);
  const activityRef = useRef(null);
  const intershipRef = useRef(null);
  const hobbyRef = useRef(null);
  const referenceRef = useRef(null);
  const languageRef = useRef(null);
  const customRef = useRef(null);

  const addCourse = (e) => {
    e.preventDefault();
    setCourses([
      ...courses,
      {
        course: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
    courseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeCourse = (index, e) => {
    e.preventDefault();
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const addActivity = (e) => {
    e.preventDefault();
    setActivities([
      ...activities,
      {
        function: "",
        employer: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ]);
    activityRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeActivity = (index, e) => {
    e.preventDefault();
    const updatedActivities = [...activities];
    updatedActivities.splice(index, 1);
    setActivities(updatedActivities);
  };

  const addInternship = () => {
    setInternships([
      ...internships,
      {
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        city: "",
        description: "",
      },
    ]);
    intershipRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeInternship = (index) => {
    const updatedInternships = [...internships];
    updatedInternships.splice(index, 1);
    setInternships(updatedInternships);
  };

  const addHobby = () => {
    setHobbies([...hobbies, ""]);
    hobbyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeHobby = (index) => {
    const updatedHobbies = [...hobbies];
    updatedHobbies.splice(index, 1);
    setHobbies(updatedHobbies);
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: "", level: "" }]);
    languageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const addReference = () => {
    setReferences([
      ...references,
      { fullName: "", company: "", phone: "", referenceEmail: "" },
    ]);
    referenceRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const removeReference = (index) => {
    const updatedReferences = [...references];
    updatedReferences.splice(index, 1);
    setReferences(updatedReferences);
  };

  const addCustomSection = () => {
    setCustomSections([
      ...customSections,
      { title: "", subTitle: "", startDate: "", endDate: "", description: "" },
    ]);
    // customRef.current?.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start",
    //   });
  };

  const removeCustomSection = (index) => {
    const updatedCustomSections = [...customSections];
    updatedCustomSections.splice(index, 1);
    setCustomSections(updatedCustomSections);
  };

  return (
    //Add courses if any
    <div className='customSecDiv '>
      <div ref={courseRef}>
        {courses.map((course, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <JournalRichtext color='#35b276' size={26} /> &nbsp;&nbsp;Course{" "}
              {index + 1} :
            </h5>

            <div className='row'>
              <div className='col-md-6 '>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Course:
                </label>
                <input
                  type='text'
                  value={course.course}
                  className='detailsInfoInput'
                  onChange={(e) => {
                    const updatedCourses = [...courses];
                    updatedCourses[index].course = e.target.value;
                    setCourses(updatedCourses);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Institution:
                </label>
                <input
                  type='text'
                  value={course.institution}
                  className='detailsInfoInput'
                  onChange={(e) => {
                    const updatedCourses = [...courses];
                    updatedCourses[index].institution = e.target.value;
                    setCourses(updatedCourses);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Start Date:
                </label>
                <input
                  type='date'
                  value={course.startDate}
                  className='detailsInfoInput'
                  onChange={(e) => {
                    const updatedCourses = [...courses];
                    updatedCourses[index].startDate = e.target.value;
                    setCourses(updatedCourses);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  End Date:
                </label>
                <input
                  type='date'
                  className='detailsInfoInput'
                  value={course.endDate}
                  onChange={(e) => {
                    const updatedCourses = [...courses];
                    updatedCourses[index].endDate = e.target.value;
                    setCourses(updatedCourses);
                  }}
                />
              </div>
            </div>

            <label className='detailsInfoLabel customSecdetailsInfoLabel courseDescription'>
              Description:
            </label>
            <textarea
              value={course.description}
              onChange={(e) => {
                const updatedCourses = [...courses];
                updatedCourses[index].description = e.target.value;
                setCourses(updatedCourses);
              }}
              rows='6 '
              cols='80'
              placeholder='Eg: Successfully completed a Prompt Engineering course, gaining valuable insights into crafting impactful prompts for AI-generated content. Acquired skills in prompt design, refinement, and collaboration with cross-functional teams..'
              className='detailsTextarea'
            />
            <br />
            <button
              type='button'
              onClick={(e) => removeCourse(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add extra curricular activities if any */}
      <div ref={activityRef}>
        {activities.map((activity, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <BagFill color='#35b276' size={24} /> &nbsp;&nbsp;Extra Curricular
              Activity {index + 1} :
            </h5>
            <div className='row'>
              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Function
                </label>
                <input
                  type='text'
                  className='detailsInfoInput'
                  value={activity.function}
                  onChange={(e) => {
                    const updatedActivities = [...activities];
                    updatedActivities[index].function = e.target.value;
                    setActivities(updatedActivities);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Employer
                </label>
                <input
                  type='text'
                  className='detailsInfoInput'
                  value={activity.employer}
                  onChange={(e) => {
                    const updatedActivities = [...activities];
                    updatedActivities[index].employer = e.target.value;
                    setActivities(updatedActivities);
                  }}
                />
              </div>

              <div className='col-md-3'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Start Date
                </label>
                <input
                  type='date'
                  style={{ "font-size": "12px", height: "38px" }}
                  className='detailsInfoInput'
                  value={activity.startDate}
                  onChange={(e) => {
                    const updatedActivities = [...activities];
                    updatedActivities[index].startDate = e.target.value;
                    setActivities(updatedActivities);
                  }}
                />
              </div>

              <div className='col-md-3'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  End Date
                </label>
                <input
                  type='date'
                  className='detailsInfoInput'
                  value={activity.endDate}
                  style={{ "font-size": "12px", height: "38px" }}
                  onChange={(e) => {
                    const updatedActivities = [...activities];
                    updatedActivities[index].endDate = e.target.value;
                    setActivities(updatedActivities);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  City:
                </label>
                <input
                  type='text'
                  className='detailsInfoInput'
                  value={activity.city}
                  onChange={(e) => {
                    const updatedActivities = [...activities];
                    updatedActivities[index].city = e.target.value;
                    setActivities(updatedActivities);
                  }}
                />
              </div>
            </div>

            <label className='detailsInfoLabel customSecdetailsInfoLabel courseDescription'>
              Description:
            </label>
            <textarea
              value={activity.description}
              onChange={(e) => {
                const updatedActivities = [...activities];
                updatedActivities[index].description = e.target.value;
                setActivities(updatedActivities);
              }}
              rows='6 '
              cols='80'
              placeholder='Eg: Engaged in impactful community service initiatives, contributing time and effort to support local causes. Developed a strong sense of social responsibility and teamwork while actively participating in various service projects. Learned to apply leadership and organizational skills to create positive change within the community.'
              className='detailsTextarea '
            />
            <br />
            <button
              type='button'
              onClick={(e) => removeActivity(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add internships if any */}
      <div ref={intershipRef}>
        {internships.map((internship, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <GraphUpArrow color='#35b276' size={24} /> &nbsp;&nbsp;Internships{" "}
              {index + 1} :
            </h5>
            <div className='row'>
              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Job Title
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={internship.jobTitle}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].jobTitle = e.target.value;
                    setInternships(updatedInternships);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Employer
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={internship.employer}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].employer = e.target.value;
                    setInternships(updatedInternships);
                  }}
                />
              </div>

              <div className='col-md-3'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Start Date
                </label>
                <input
                  className='detailsInfoInput'
                  type='date'
                  style={{ "font-size": "12px", height: "38px" }}
                  value={internship.startDate}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].startDate = e.target.value;
                    setInternships(updatedInternships);
                  }}
                />
              </div>

              <div className='col-md-3'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  End Date
                </label>
                <input
                  className='detailsInfoInput'
                  type='date'
                  style={{ "font-size": "12px", height: "38px" }}
                  value={internship.endDate}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].endDate = e.target.value;
                    setInternships(updatedInternships);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  City
                </label>
                <br />
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={internship.city}
                  onChange={(e) => {
                    const updatedInternships = [...internships];
                    updatedInternships[index].city = e.target.value;
                    setInternships(updatedInternships);
                  }}
                />
              </div>
            </div>

            <label className='detailsInfoLabel customSecdetailsInfoLabel courseDescription'>
              Description:
            </label>
            <textarea
              value={internship.description}
              onChange={(e) => {
                const updatedInternships = [...internships];
                updatedInternships[index].description = e.target.value;
                setInternships(updatedInternships);
              }}
              rows='6 '
              cols='80'
              placeholder='Eg: Interned in Prompt Engineering, where I leveraged technologies such as Python, Natural Language Processing (NLP), and machine learning to design and refine prompts for AI-generated content. Collaborated on projects involving innovative tools and frameworks, gaining hands-on experience in the intersection of technology and content creation.'
              className='detailsTextarea '
            />
            <br />
            <button
              type='button'
              onClick={(e) => removeInternship(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add hobbies if any */}
      <div ref={hobbyRef}>
        {hobbies.map((hobby, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <Bicycle color='#35b276' size={24} /> &nbsp;&nbsp;Hobbies
            </h5>
            <textarea
              value={hobby}
              onChange={(e) => {
                const updatedHobbies = [...hobbies];
                updatedHobbies[index] = e.target.value;
                setHobbies(updatedHobbies);
              }}
              rows='6 '
              cols='80'
              placeholder='Eg: Travelling, Hiking, Swimming,Cricket'
              className='detailsTextarea '
            />
            <br />
            <button
              type='button'
              onClick={(e) => removeHobby(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add Languages if any */}
      <div ref={languageRef}>
        {languages.map((language, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <Alipay color='#35b276' size={24} /> &nbsp;&nbsp;Languages{" "}
              {index + 1} :
            </h5>
            <div className='row'>
              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Language:
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={language.language}
                  onChange={(e) => {
                    const updatedLanguages = [...languages];
                    updatedLanguages[index].language = e.target.value;
                    setLanguages(updatedLanguages);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Level:
                </label>
                <select
                  className='detailsInfoInput'
                  value={language.level}
                  onChange={(e) => {
                    const updatedLanguages = [...languages];
                    updatedLanguages[index].level = e.target.value;
                    setLanguages(updatedLanguages);
                  }}
                >
                  <option value='' className='detailsInfoInput'>
                    Select Level
                  </option>
                  <option value='native speaker'>Native Speaker</option>
                  <option value='Highly Good Command'>
                    Highly Good Command
                  </option>
                  <option value='Very Good Command'>Very Good Command</option>
                  <option value='Good Working Knowledge'>
                    Good Working Knowledge
                  </option>
                  <option value='Working Knowledge'>Working Knowledge</option>
                  <option value='C2'>C2</option>
                  <option value='C1'>C1</option>
                  <option value='B2'>B2</option>
                  <option value='B1'>B1</option>
                  <option value='A2'>A2</option>
                  <option value='A1'>A1</option>
                </select>
              </div>
            </div>
            <br />
            <button
              type='button'
              onClick={(e) => removeLanguage(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add references if any */}
      <div ref={referenceRef}>
        {references.map((reference, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <MegaphoneFill color='#35b276' size={24} /> &nbsp;&nbsp;References{" "}
              {index + 1} :
            </h5>
            <div className='row'>
              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Full Name
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={reference.fullName}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].fullName = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Company
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={reference.company}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].company = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Phone
                </label>
                <input
                  className='detailsInfoInput'
                  type='number'
                  value={reference.phone}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].phone = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Email
                </label>
                <input
                  className='detailsInfoInput'
                  type='email'
                  value={reference.referenceEmail}
                  onChange={(e) => {
                    const updatedReferences = [...references];
                    updatedReferences[index].referenceEmail = e.target.value;
                    setReferences(updatedReferences);
                  }}
                />
              </div>
            </div>
            <br />
            <button
              type='button'
              onClick={(e) => removeReference(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {/* Add custom details if any */}
      <div ref={customRef}>
        {customSections.map((section, index) => (
          <div key={index} className='employmentHistoryDiv'>
            <h5 className='personalSubSubHeading'>
              <CheckSquare color='#35b276' size={24} /> &nbsp;&nbsp;Custom
              Section {index + 1} :
            </h5>
            <div className='row'>
              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Title:
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={section.title}
                  placeholder='Eg: Projects'
                  onChange={(e) => {
                    const updatedCustomSections = [...customSections];
                    updatedCustomSections[index].title = e.target.value;
                    setCustomSections(updatedCustomSections);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Sub-Title:
                </label>
                <input
                  className='detailsInfoInput'
                  type='text'
                  value={section.subTitle}
                  placeholder='Eg: PromptOptiGen'
                  onChange={(e) => {
                    const updatedCustomSections = [...customSections];
                    updatedCustomSections[index].subTitle = e.target.value;
                    setCustomSections(updatedCustomSections);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  Start Date
                </label>
                <input
                  className='detailsInfoInput'
                  type='date'
                  value={section.startDate}
                  onChange={(e) => {
                    const updatedCustomSections = [...customSections];
                    updatedCustomSections[index].startDate = e.target.value;
                    setCustomSections(updatedCustomSections);
                  }}
                />
              </div>

              <div className='col-md-6'>
                <label className='detailsInfoLabel customSecdetailsInfoLabel'>
                  End Date
                </label>
                <input
                  className='detailsInfoInput'
                  type='Date'
                  value={section.endDate}
                  onChange={(e) => {
                    const updatedCustomSections = [...customSections];
                    updatedCustomSections[index].endDate = e.target.value;
                    setCustomSections(updatedCustomSections);
                  }}
                />
              </div>
            </div>

            <label className='detailsInfoLabel customSecdetailsInfoLabel courseDescription'>
              Description:
            </label>
            <textarea
              value={section.description}
              onChange={(e) => {
                const updatedCustomSections = [...customSections];
                updatedCustomSections[index].description = e.target.value;
                setCustomSections(updatedCustomSections);
              }}
              rows='6 '
              cols='80'
              placeholder='Eg: Developed an innovative Prompt Engineering project using Python, NLP, and machine learning to optimize AI-generated content prompts. Implemented advanced algorithms for prompt design and refinement, showcasing expertise in enhancing content creation processes and boosting user engagement.'
              className='detailsTextarea '
            />
            <br />
            <button
              type='button'
              onClick={(e) => removeCustomSection(index, e)}
              className='DeleteEmp'
            >
              <Trash3Fill size={20} />
            </button>
          </div>
        ))}
      </div>

      {!liveForm && (
        <div className='customHeadingsLowerDiv row'>
          <h5 className='formSection customSecMainHeading'>
            <ColumnsGap color='#35b276' size={32} /> &nbsp;Add Custom Details
          </h5>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addCourse}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <Book size={26} />
              &nbsp;&nbsp;&nbsp;Add Courses
            </button>
          </div>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addActivity}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <BagFill size={26} />
              &nbsp;&nbsp;&nbsp;Add Extra-Cirricular Activities
            </button>
          </div>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addInternship}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <GraphUpArrow size={26} />
              &nbsp;&nbsp;&nbsp;Add Internships
            </button>
          </div>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addHobby}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <Bicycle size={26} />
              &nbsp;&nbsp;&nbsp;Add Hobbies
            </button>
          </div>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addLanguage}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <Alipay size={26} />
              &nbsp;&nbsp;&nbsp;Add Languages
            </button>
          </div>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addReference}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <MegaphoneFill size={26} />
              &nbsp;&nbsp;&nbsp;Add References
            </button>
          </div>
          <div className='col-md-4 checkme zoom'>
            <button
              type='button'
              onClick={addCustomSection}
              className='Sec1additionalDetails addExtraBtns'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <CheckSquare size={26} />
              &nbsp;&nbsp;&nbsp;Add Custom Section
            </button>
          </div>
        </div>
      )}

      {/* Custom Sectio For Create Live */}
      {liveForm && (
        <div className='customHeadingsLowerDiv row'>
          <h5 className='formSection customSecMainHeading'>
            <ColumnsGap color='#35b276' size={32} /> &nbsp;Add Custom Details
          </h5>
          <div className='col-md-5  zoom'>
            <button
              type='button'
              onClick={addCourse}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <Book size={25} />
              &nbsp;&nbsp;&nbsp;Add Courses
            </button>
          </div>
          <div className='col-md-7  zoom'>
            <button
              type='button'
              onClick={addActivity}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <BagFill size={25} />
              &nbsp;&nbsp;&nbsp;Add Extra-Cirricular Activities
            </button>
          </div>
          <div className='col-md-5  zoom'>
            <button
              type='button'
              onClick={addInternship}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <GraphUpArrow size={25} />
              &nbsp;&nbsp;&nbsp;Add Internships
            </button>
          </div>
          <div className='col-md-7  zoom'>
            <button
              type='button'
              onClick={addHobby}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <Bicycle size={25} />
              &nbsp;&nbsp;&nbsp;Add Hobbies
            </button>
          </div>
          <div className='col-md-5  zoom'>
            <button
              type='button'
              onClick={addLanguage}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <Alipay size={25} />
              &nbsp;&nbsp;&nbsp;Add Languages
            </button>
          </div>
          <div className='col-md-7  zoom'>
            <button
              type='button'
              onClick={addReference}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <MegaphoneFill size={25} />
              &nbsp;&nbsp;&nbsp;Add References
            </button>
          </div>
          <div className='col-md-5  zoom'>
            <button
              type='button'
              onClick={addCustomSection}
              className='Sec1additionalDetails addExtraBtns createCustomAdditons'
            >
              {/* <Check2Circle size={20} /> &nbsp;&nbsp; */}
              <CheckSquare size={25} />
              &nbsp;&nbsp;&nbsp;Add Custom Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
