import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import img1 from '../images/14.png'
import '../styleSheet/temp4.css'
import { PersonFill, BagDashFill, AwardFill, PeopleFill, MegaphoneFill, JournalBookmarkFill, TrophyFill, TropicalStorm } from "react-bootstrap-icons";
import img8 from '../images/profileicon.png'


const styles = StyleSheet.create({
  page: {
    padding: 0,
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

export default function MyPdfViewer4({ personalData, live, courses, activities, internships, hobbies, languages, references, customSections, skills,jobTitle }) {
  const firebaseImageUrl = personalData.uploadedPhotoURL;
  return (
    <>
      <div className='row temp4MainDiv'>
        <div className='col-md-4 temp4LeftCol'>
          <div className='leftInnerColoumn'>
            <View>
              <div className='temp4ImageDiv'>
                <div className='imageBg'>
                  {/* <img src={firebaseImageUrl} className="temp4DisplayImage" />  */}
                  {personalData.uploadedPhotoURL ?
                    <img src={firebaseImageUrl} className="temp4DisplayImage" />
                    :
                    <img src={img8} className="temp4DisplayImage" />
                  }
                </div>
              </div>
            </View>
            <div className='temp4ProfileDetails'>
              <p className='profileDetails temp3PersonalDetails temp4BlueFont'>CONTACT</p>
              <hr className='temp4Hr'></hr>
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
                <p className='profileDetailsText temp3Underline'>{personalData.inputEmail}</p>
              </>}

              {/* {personalData.dateOfBirth && personalData.dateOfBirth.length > 0 && personalData.placeOfBirth && personalData.placeOfBirth.length > 0 && <>
                <p className='profileDetailsText DOBProfileDetailsText profileDetailSubHeading'>DOB/Place</p>
                <p className='profileDetailsText'>{personalData.dateOfBirth}</p>
              </>}
              {personalData.placeOfBirth && personalData.placeOfBirth.length > 0 && <>
                <p className='profileDetailsText'>{personalData.placeOfBirth}</p>
              </>} */}

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
                <p className='profileDetails otherProfileDetails temp4BlueFont'>SKILLS</p>
                <hr className='temp4Hr'></hr>
                {skills.map((item, index) => {
                  return (
                    <p className='profileDetailsText liveSkills'>{item!==undefined && item.charAt(0).toUpperCase() + item.slice(1)}</p>)
                })
                }</>}


              {languages && languages.length > 0 && <>
                <p className='profileDetails otherProfileDetails temp4BlueFont'>LANGUAGES</p>
                <hr className='temp4Hr'></hr>
                {languages.map((item, index) => {
                  return (<>
                    <p className='profileDetailsText liveSkills'>{item.language}</p>
                    <p className='profileDetailsText liveSkills languageLevel'>({item.level})</p>
                  </>)
                })
                }</>}

              {hobbies && hobbies.length > 0 && <>
                <p className='profileDetails otherProfileDetails temp4BlueFont'>HOBBIES</p>
                <hr className='temp4Hr'></hr>

                <p className='profileDetailsText liveSkills'> {hobbies}</p>
              </>}
            </div>
          </div>
        </div>


        {/* ********************************************************************** */}
        {/* ********************************************************************** */}
        {/* ********************************************************************** */}
        {/* ********************************************************************** */}

        <div className='col-md-8 temp4RightCol'>
          <Document>
            <Page size="A4" style={styles.page}>

              <div className='temp4GreyBigDiv'>
                <div className='nameDiv temp4NameDiv'>
                  {/* <p className='resumeTtile temp4ResumeTitle'>{personalData.jobTitle.toUpperCase()}</p> */}
                   <p className='resumeTtile temp4ResumeTitle'>{jobTitle!==undefined && jobTitle!==''? jobTitle.toUpperCase(): personalData.jobTitle.toUpperCase()}</p>

                  <h6 className='resumeName temp4ResumeName'>{personalData.firstName!==undefined && personalData.firstName.toUpperCase()} {personalData.middleName!==undefined &&personalData.middleName.toUpperCase()} {personalData.lastName!==undefined &&personalData.lastName.toUpperCase()}</h6>
                  <hr className='temp4Hr2'></hr>
                  <p className='profileText temp4ProfessionalSummary'>{personalData.professionalSummary}</p>
                </div>
              </div>



              <View >
                <div className='temp4LeftContent'>

                  {personalData.employmentHistory && personalData.employmentHistory.length > 0 && personalData.employmentHistory[0].jobTitle !== '' && <>
                    <div className='liveEmployment'>
                      <p className='profileName employmentHistName template4RightHeadings'>EXPERIENCE</p>
                      <hr className='temp3Hr3'></hr>
                      {personalData.employmentHistory.map((item, index) => {
                        return (<>
                          <p className='profileEmploymentName'>{item.jobTitle} at {item.employer} , {item.city}</p>
                          <p className='employmentTime DOBProfileDetailsText'> {item.startDate} - {item.endDate}</p>
                          <p className='profileText employmetnProfileText'>{item.description}</p>
                        </>)
                      })
                      }
                    </div>
                  </>}

                  {personalData.educationHistory && personalData.educationHistory.length > 0 && personalData.educationHistory[0].school !== '' && <>
                    <div className='liveEducation'>
                      <p className='profileName employmentHistName template4RightHeadings'>EDUCATION</p>
                      <hr className='temp3Hr3'></hr>
                      {personalData.educationHistory.map((item, index) => {
                        return (<>
                          <p className='profileEmploymentName'>{item.school}, {item.city}</p>
                          <p className='employmentTime DOBProfileDetailsText'>{item.degree}, {item.startDate} - {item.endDate}</p>
                          <p className='profileText employmetnProfileText'>{item.description}</p>
                        </>)
                      })
                      }
                    </div>
                  </>}

                  {internships && internships.length > 0 && internships[0].jobTitle !== '' && <>
                    <div className='liveEducation'>
                      <p className='profileName employmentHistName template4RightHeadings'>INTERNSHIPS</p>
                      <hr className='temp3Hr3'></hr>

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

                  {references && references.length > 0 && references[0].fullName !== '' && <>
                    <div className='liveEducation'>
                      <p className='profileName employmentHistName template4RightHeadings'>REFERENCES</p>
                      <hr className='temp3Hr3'></hr>

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


                  {courses && courses.length > 0 && courses[0].course !== '' && <>
                    <div className='liveEducation'>
                      <p className='profileName employmentHistName template4RightHeadings'>COURSES</p>
                      <hr className='temp3Hr3'></hr>

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


                  {activities && activities.length > 0 && activities[0].function !== '' && <>
                    <div className='liveEducation'>
                      <p className='profileName employmentHistName template4RightHeadings'>EXTRA-CURRICULAR ACTIVITES</p>
                      <hr className='temp3Hr3'></hr>
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

                  {customSections && customSections.length > 0 && customSections[0].subTitle !== '' && <>
                    {customSections.map((item, index) => {
                      return (<>
                        <div className='liveEducation'>
                          <p className='profileName employmentHistName template4RightHeadings'>{item.title}</p>
                          <hr className='temp3Hr3'></hr>
                          <p className='profileName temp4CustomTitle'>{item.subTitle}</p>
                          <p className='employmentTime DOBProfileDetailsText'>{item.startDate} - {item.endDate}</p>
                          <p className='profileText employmetnProfileText'>{item.description} </p>
                        </div>
                      </>)
                    })
                    }
                  </>}
                </div>
              </View>
            </Page>

          </Document>

        </div>

      </div>
    </>

  );
}
