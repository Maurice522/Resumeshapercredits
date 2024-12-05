import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import img1 from '../images/14.png'
import { PersonFill, BagDashFill, AwardFill, PeopleFill, MegaphoneFill, JournalBookmarkFill, TrophyFill, TropicalStorm } from "react-bootstrap-icons";
import img8 from '../images/profileicon.png'


const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default function MyPdfViewer1({ personalData, live, courses, activities, internships, hobbies, languages, references, customSections, skills,jobTitle}) {
  const firebaseImageUrl = personalData.uploadedPhotoURL;
  // console.log(personalData.professionalSummary)
  // console.log(personalData.professionalSummary !== undefined)
  return (

    <div className='scrollableDiv'>
      <Document>
        <Page size="A4" style={styles.page}>
          <View>
            <div className='topDivTemplate1' >
              <div className='imageDiv'>
                {console.log('MY THIISSSSSSSSS uploaded url ', personalData.uploadedPhotoURL)}
                {personalData.uploadedPhotoURL ?
                  <img src={firebaseImageUrl} className="displayImage" />
                  :
                  <img src={img8} className="displayImage" />
                }
              </div>
              <div className='nameDiv'>
                <h6 className='resumeName'>{personalData.firstName} {personalData.middleName} {personalData.lastName}</h6>
                <p className='resumeTtile'>{jobTitle!==''? jobTitle: personalData.jobTitle}</p>
              </div>
            </div>
          </View>

          <View >
            <div className='row liveProfileDiv'>
              <div className='col-md-8 liveProfileDivLeft'>
                <p className='profileName'><PersonFill size={8} className="profileIcon" /> &nbsp;Profile</p>
                {
                <p className='profileText'>{personalData?.professionalSummary!==undefined &&personalData.professionalSummary!==""&& personalData?.professionalSummary}</p>
                }
                {personalData.employmentHistory && personalData?.employmentHistory?.length > 0 && personalData?.employmentHistory[0]?.jobTitle !== '' && <>
                  <div className='liveEmployment'>
                    <p className='profileName employmentHistName'><BagDashFill size={8} className="profileIcon" /> &nbsp;Employment History</p>
                    {personalData.employmentHistory.map((item, index) => {
                      return (<>
                      {/* {personalData.professionalSummary.charAt(0).toUpperCase() + personalData.professionalSummary.slice(1)} */}
                        <p className='profileEmploymentName'>{item.jobTitle} at {item.employer} , {item.city}</p>
                        <p className='employmentTime DOBProfileDetailsText'> {item.startDate} - {item.endDate}</p>
                        <p className='profileText employmetnProfileText'>{item.description}</p>
                      </>)
                    })
                    }
                  </div>
                </>}

                {personalData?.educationHistory && personalData?.educationHistory?.length > 0 && personalData.educationHistory[0]?.school !== '' && <>
                  <div className='liveEducation'>
                    <p className='profileName employmentHistName'><AwardFill size={8} className="profileIcon" /> &nbsp;Education</p>
                    {personalData?.educationHistory.map((item, index) => {
                      return (<>
                      
                        <p className='profileEmploymentName'>{item.school}, {item.city}</p>
                        <p className='employmentTime DOBProfileDetailsText'>{item.degree}, {item.startDate} - {item.endDate}</p>
                        <p className='profileText employmetnProfileText'>{item.description}</p>
                      </>)
                    })
                    }
                  </div>
                </>}

                {internships && internships?.length > 0 && internships[0]?.jobTitle !== '' && <>
                  <div className='liveEducation'>
                    <p className='profileName employmentHistName'><PeopleFill size={8} className="profileIcon" /> &nbsp;Internships</p>
                    {internships.map((item, index) => {
                      return (<>
                        <p className='profileEmploymentName'>{item.jobTitle} at {item.employer}, {item.city} </p>
                        <p className='employmentTime DOBProfileDetailsText'>{item.startDate} - {item.endDate}</p>
                        <p className='profileText employmetnProfileText'>{item.description} </p>
                      </>)
                    })
                    }
                  </div>
                </>}

                {references && references?.length > 0 && references[0]?.fullName !== '' && <>
                  <div className='liveEducation'>
                    <p className='profileName employmentHistName'><MegaphoneFill size={8} className="profileIcon" /> &nbsp;References</p>
                    {references.map((item, index) => {
                      return (<>
                        <p className='profileEmploymentName'>{item.fullName}, {item.company}</p>
                        <p className='employmentTime DOBProfileDetailsText'>{item.phone}</p>
                        <p className='profileText employmetnProfileText'> {item.referenceEmail}</p>
                      </>)
                    })
                    }
                  </div>
                </>}


                {courses && courses?.length > 0 && courses[0]?.course !== '' && <>
                  <div className='liveEducation'>
                    <p className='profileName employmentHistName'>< JournalBookmarkFill size={8} className="profileIcon" /> &nbsp;Courses</p>
                    {courses.map((item, index) => {
                      return (<>
                        <p className='profileEmploymentName'>{item.course},{item.institution}</p>
                        <p className='employmentTime DOBProfileDetailsText'>{item.startDate} - {item.endDate}</p>
                        <p className='profileText employmetnProfileText'>{item.description} </p>
                      </>)
                    })
                    }
                  </div>
                </>}


                {activities && activities?.length > 0 && activities[0]?.function !== '' && <>
                  <div className='liveEducation'>
                    <p className='profileName employmentHistName'>< TrophyFill size={8} className="profileIcon" /> &nbsp;Extra-Curricular Activities</p>
                    {activities.map((item, index) => {
                      return (<>
                        <p className='profileEmploymentName'>{item.function}, {item.employer} , {item.city}</p>
                        <p className='employmentTime DOBProfileDetailsText'>{item.startDate} - {item.endDate}</p>
                        <p className='profileText employmetnProfileText'>{item.description}</p>
                      </>)
                    })
                    }
                  </div>
                </>}

                {customSections && customSections?.length > 0 && customSections[0]?.subTitle !== '' && <>
                  {customSections.map((item, index) => {
                    return (<>
                      <div className='liveEducation'>
                        <p className='profileName employmentHistName'>< TropicalStorm size={8} className="profileIcon" /> &nbsp;{item.title}</p>
                        <p className='profileEmploymentName'>{item.subTitle}</p>
                        <p className='employmentTime DOBProfileDetailsText'>{item.startDate} - {item.endDate}</p>
                        <p className='profileText employmetnProfileText'>{item.description} </p>
                      </div>
                    </>)
                  })
                  }
                </>}

              </div>
              <div className='col-md-4 liveProfileDivRight'>
                <p className='profileDetails'>Personal Details</p>
                {personalData.address && personalData.address.length > 0 && <>
                  <p className='profileDetailsText'>{personalData.address}</p>
                </>}

                {personalData.city && personalData.city.length > 0 && <>
                  <p className='profileDetailsText'>{personalData.city} {personalData.pincode}</p>
                </>}

                {personalData.country && personalData.country.length > 0 && <>
                  <p className='profileDetailsText'>{personalData.country}</p>
                </>}

                {personalData.phone && personalData.phone.length > 0 && <>
                  <p className='profileDetailsText'>{personalData.phone}</p>
                </>}

                {personalData.inputEmail && personalData.inputEmail.length > 0 && <>
                  <p className='profileDetailsText emailProfileDetailsText'>{personalData.inputEmail}</p>
                </>}

                {personalData.dateOfBirth && personalData.dateOfBirth.length > 0 && <>
                  <p className='profileDetailsText DOBProfileDetailsText profileDetailSubHeading'>DOB</p>
                  <p className='profileDetailsText'>{personalData.dateOfBirth}</p>
                </>}
                {personalData.placeOfBirth && personalData.placeOfBirth.length > 0 && <>
                  <p className='profileDetailsText'>{personalData.placeOfBirth}</p>
                </>}


                {personalData.nationality && personalData.nationality.length > 0 && <>
                  <p className='profileDetailsText profileDetailSubHeading DOBProfileDetailsText'>Nationality</p>
                  <p className='profileDetailsText'>{personalData.nationality}</p>
                </>}

                {personalData.drivingLicense && personalData.drivingLicense.length > 0 && <>
                  <p className='profileDetailsText profileDetailSubHeading DOBProfileDetailsText'>Driving Liscence</p>
                  <p className='profileDetailsText'>{personalData.drivingLicense}</p>
                </>}

                {personalData?.websitesAndLinks && personalData?.websitesAndLinks?.length > 0 && personalData.websitesAndLinks[0]?.name !== '' && <>
                    <p className='profileDetails otherProfileDetails'>Links</p>
                    {personalData?.websitesAndLinks.map((item, index) => {
                      return (<>
                        <p className='profileDetailsText emailProfileDetailsText'>{item.url}</p>
                      </>)
                    })
                    }
                </>}


                {skills && skills.length > 0 && <>
                  <p className='profileDetails otherProfileDetails'>Skills</p>
                  {skills.map((item, index) => {
                    return (
                      <p className='profileDetailsText liveSkills'>{item}</p>)
                  })
                  }</>}


                {languages && languages.length > 0 && <>
                  <p className='profileDetails otherProfileDetails'>Languages</p>
                  {languages.map((item, index) => {
                    return (<>
                      <p className='profileDetailsText liveSkills'>{item.language}</p>
                      <p className='profileDetailsText liveSkills languageLevel'>({item.level})</p>
                    </>)
                  })
                  }</>}

                {hobbies && hobbies.length > 0 && <>
                  <p className='profileDetails otherProfileDetails'>Hobbies</p>
                  <p className='profileDetailsText liveSkills'> {hobbies}</p>
                </>}

              </div>

            </div>
          </View>
        </Page>

      </Document>
    </div>
  );
}
