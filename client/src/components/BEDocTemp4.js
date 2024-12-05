import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image,PDFViewer } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer'
import img1 from '../images/17.png'
import img2 from '../images/icon111.png'
import img3 from '../images/icon2.png'
import img4 from '../images/icon3.png'
import img5 from '../images/icon4.png'
import img6 from '../images/icon5.png'
import img7 from '../images/icon6.png'
import img8 from '../images/icon7.png'
import img9 from '../images/icon8.png'
import { paste } from '@testing-library/user-event/dist/paste';
import { enablePersistentCacheIndexAutoCreation } from 'firebase/firestore';
import { PcDisplayHorizontal } from 'react-bootstrap-icons';

Font.register({ family: 'Roboto', src: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@300&family=Roboto:wght@300&display=swap' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 30, // Add padding here
    color:'#3E3F4E',  //black
    paddingTop:30 ,
    paddingBottom:0 ,
    paddingleft:0,
    paddingRight:0,
    position:'relative',
    right:0
  },
  leftColumn: {
    width: '32%',
    padding: 0,
    backgroundColor:'#d9e6eb',
    position:'absolute',
    top:0,
    bottom:0,
    paddingLeft:10,
    paddingRight:13,
    paddingTop:35,
    left:20,
      },
  rightColumn: {
    width: '100%',
    padding: 10,
    marginLeft:'28.5%',
    paddingRight:0,
    paddingTop:10
    // paddingLeft:25
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    marginBottom:5,
    marginLeft:12,
    marginTop:5,
    letterSpacing:2,
    color:'#1E2532', //blue

  },
  designation: {
    fontSize: 15,
    margin:12,
    paddingLeft:0,
    paddingRight:5,
    textAlign:'left',
    color:'#1E2532', //blue
    marginBottom:0,
  },
  sectionTitle: {
    fontSize: 16,
    color:'#1E2532',
    marginTop:8,
    letterSpacing:1
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 9,
    paddingTop:7,
    textAlign:'justify',
    lineHeight:1.4
  },
  subTitle:{
    fontSize: 13,
    paddingLeft: 9,
    paddingTop:7,
    textAlign:'left',
  },
  subSubTitle:{
    fontSize: 10,
    paddingLeft: 9,
    paddingTop:5,
    textAlign:'left',
  },
  hobbies: {
    marginTop: 95 // Add top padding to Hobbies
  },
  image: {
    width: 100,
    height: 100,
    borderRadius:100,
  },
  icon1:{
    width:11,
    height:12,
  },
  rightHeading:{
    marginTop: 30,
    fontSize:15,
    paddingLeft: 18,
    marginBottom:8,
    color:'#1E2532'
  },
  rightParagraph:{
    fontSize: 12,
    marginBottom: 4,
    paddingLeft: 18,
    lineHeight:1.4
  },
  rightSubHeading:{
    fontSize: 12,
    paddingLeft: 18,
    marginTop:8,
    marginBottom:4,
  },
  rightOtherHeading:{
    fontSize:13,
    paddingLeft: 18,
    marginBottom:8,
    marginTop:29,
    color:'#1E2532',
  },
  colorThisBlue:{
    color:'#1A91F0' //sky blue

  },
  colorThisGrey:{
    color:'#828BA2',
    marginBottom:'2%'
  },
  leftColColorGrey:{
    marginTop:'11%'
  },
  colorThisBlack:{
    color:'#1E2532',  //blue
    fontWeight: 'bold',
  },
  line: {
    height: 1, // Line height
    width: '20%', // 20% for the line
    backgroundColor: '#1E2532', // Line color
    marginTop: 6, // Adjust this value for spacing
    color:'#1A91F0',
    marginLeft:14,
    marginBottom:'3%',
    marginTop:'2%',

  },
  rightContent:{
    marginLeft:'6.2%',
    paddingRight:'9.2%',
    marginTop:"6%"
  },
  contentLine:{
    height: 1, // Line height
    width: 30,
    marginTop:'7%',
    marginBottom:'9%',
    backgroundColor: '#1E2532', // Line color
    marginLeft:'1.3%'
  },
  profileParagraph:{
    paddingLeft:12,
  },
  content1Line:{
    height: 1, // Line height
    width: 30,
    marginTop:'1%',
    marginBottom:'12%',
    backgroundColor: '#1E2532', // Line color
    marginLeft:'11%'
  },
  content2Line:{
    height: 1, // Line height
    width: 30,
    marginTop:'-2%',
    marginBottom:'-6%',
    backgroundColor: '#1E2532', // Line color
    marginLeft:'1.3%'
  },
  leftContactContent:{
    marginTop:'3%'
  }
});


export default function BEDocTemp3({ imgFile, personalData,courses, activities,internships,hobbies,languages,references ,customSections ,skills }) {
  console.log(personalData)
  const uppercasedFirstName = personalData.firstName.toUpperCase();
  const uppercasedMiddleName = personalData.middleName.toUpperCase();
  const uppercasedLastName = personalData.lastName.toUpperCase();
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.leftColumn}>
      <View style={{ alignItems: 'center' ,padding:'4%',marginBottom:'5%'}}>
      {imgFile &&  
      <View style={{ alignItems: 'center' , backgroundColor:'#a9c9d7',padding:'4%',borderRadius:'100%'}}>
          {/* <Image style={styles.image} src={imgFile===null? img1:imgFile} /> */}
         <Image style={styles.image} src={imgFile}/> 
        </View>
        }
        </View>
        <View style={styles.leftContactContent}>
      <Text style={[styles.rightHeading,styles.colorThisBlack]}>CONTACT</Text>
      <View style={styles.content1Line}></View>
      {personalData.address && personalData.address.length >0 && <>
          <Text style={styles.rightParagraph}>{personalData.address}</Text>
          </>}
          
          {personalData.city && personalData.city.length >0 && <>
          <Text style={styles.rightParagraph}>{personalData.city} {personalData.pincode}</Text>
          </>}

          {personalData.country && personalData.country.length >0 && <>
          <Text style={styles.rightParagraph}>{personalData.country}</Text>
          </>}
         
         {personalData.phone && personalData.phone.length >0 && <>
          <Text style={styles.rightParagraph}>{personalData.phone}</Text>
          </>}
          
          {personalData.inputEmail && personalData.inputEmail.length >0 && <>
          <Text style={[styles.rightParagraph,styles.colorThisBlue]}>{personalData.inputEmail}</Text>
          </>}

          {personalData.dateOfBirth && personalData.dateOfBirth.length >0 && <>
          <Text style={[styles.rightSubHeading,styles.colorThisGrey]}>DOB</Text>
          <Text style={styles.rightParagraph}>{personalData.dateOfBirth}</Text>
          </>}

          {personalData.placeOfBirth && personalData.placeOfBirth.length >0 &&  <>
          <Text style={styles.rightParagraph}>{personalData.placeOfBirth}</Text>
          </>}

          {personalData.nationality && personalData.nationality.length >0 &&  <>
          <Text style={[styles.rightSubHeading,styles.leftColColorGrey]}>Nationality</Text>
          <Text style={styles.rightParagraph}>{personalData.nationality}</Text>
          </>}

          {personalData.drivingLicense && personalData.drivingLicense.length >0 && <>
          <Text style={[styles.rightSubHeading,styles.leftColColorGrey]}>Driving Liscence</Text>
          <Text style={styles.rightParagraph}>{personalData.drivingLicense}</Text>
          </>}

          {personalData.websitesLinks && personalData.websitesLinks.length >0 && personalData.websitesLinks[0].name!=='' && <>
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Links</Text>
          <View style={styles.content1Line}></View>
          { personalData.websitesLinks.map((item,index)=>{
          return (<>
          {/* <Text style={styles.rightParagraph}>{item.name}</Text> */}
          <Text style={[styles.rightParagraph,styles.colorThisBlue]}>{item.url}</Text>
          </>)
        })
         }
</>}


          {skills && skills.length>0 && <>
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Skills</Text>
          <View style={styles.content1Line}></View>
          {skills.map((item,index)=>{
          return (<Text style={[styles.rightParagraph]}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>)
          })
          }</>}
   

   {languages && languages.length>0 && <>
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Languages</Text>
          <View style={styles.content1Line}></View>
          
          {languages.map((item,index)=>{
            return(<>
              <Text style={styles.rightParagraph}>{item.language}</Text>
          <Text style={[styles.rightParagraph]}>({item.level})</Text>
            </> )
          })
        }</>}
         
          
{hobbies && hobbies.length>0 && <>      
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Hobbies</Text>
          <View style={styles.content1Line}></View>

          <Text style={styles.rightParagraph}>{hobbies}</Text>
          </>}

      </View>
      </View>

      <View style={styles.rightColumn}>
      <View style={{alignItems: 'left',width:"100%" , backgroundColor:"#f5f5f5",paddingRight:'10%',paddingLeft:'5%',paddingTop:'5%',paddingBottom:'2%',marginTop:'-2%'}}>
      <View style={{alignItems: 'left', marginTop:8,width:"100%" }}>
      <Text style={styles.designation}>{personalData.jobTitle}</Text>
            <Text style={styles.name}>{uppercasedFirstName} {uppercasedMiddleName} {uppercasedLastName}</Text>
            <View style={styles.line}></View>
          
       </View>
       {personalData.professionalSummary && personalData.professionalSummary.length >0 && <>
        <Text style={[styles.paragraph,styles.profileParagraph]}>{personalData.professionalSummary} </Text>
        </>}
</View>

<View style={styles.rightContent}>

{personalData.employmentHistory && personalData.employmentHistory.length >0 && personalData.employmentHistory[0].jobTitle!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>EXPERIENCE</Text>
            <View style={styles.contentLine}></View>

          </View>
        </View>
        { personalData.employmentHistory.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.jobTitle} at {item.employer} , {item.city}</Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate}</Text>
        <Text style={styles.paragraph}>{item.description}  </Text>
        </>)
      })
       }
        </>}

 {personalData.educationHistory && personalData.educationHistory.length >0 && personalData.educationHistory[0].school!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>EDUCATION</Text>
            <View style={styles.contentLine}></View>
          </View>
        </View>
        { personalData.educationHistory.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.school}, {item.city} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.degree}, {item.startDate} - {item.endDate}  </Text>
        <Text style={styles.paragraph}>{item.description}  </Text>
        </>)
        })
         }
</>}   


{internships && internships.length >0 && internships[0].jobTitle!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>INTERNSHIPS</Text>
            <View style={styles.contentLine}></View>
          </View>
        </View>
        { internships.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.jobTitle} at {item.employer}, {item.city} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate}  </Text>
        <Text style={styles.paragraph}>{item.description}</Text>
        </>)
        })
         }
</>}
      
{references && references.length >0 && references[0].fullName!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>REFERENCES</Text>
            <View style={styles.contentLine}></View>
          </View>
        </View>
        { references.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.fullName}, {item.company} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.phone}</Text>
        <Text style={styles.paragraph}>{item.referenceEmail} </Text>
        </>)
        })
         }
</>}


{courses && courses.length >0 && courses[0].course!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>COURSES</Text>
            <View style={styles.contentLine}></View>
          </View>
        </View>
        { courses.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.course}, {item.institution} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate} </Text>
        <Text style={styles.paragraph}>{item.description}</Text>
        </>)
        })
         }
</>}

{activities && activities.length >0 && activities[0].function!=='' && <>
           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>EXTRA-CURRICULUM ACTIVITIES</Text>
            <View style={styles.content2Line}></View>
          </View>
        </View>
        { activities.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.function}, {item.employer} , {item.city}</Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate} </Text>
        <Text style={styles.paragraph}>{item.description}</Text>
        </>)
        })
         }
</>}


{customSections && customSections.length >0 && customSections[0].subTitle!=='' && <>
{ customSections.map((item,index)=>{
          return (<>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <View style={styles.contentLine}></View>
          </View>
        </View>
        <Text style={styles.subTitle}>{item.subTitle} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate} </Text>
        <Text style={styles.paragraph}>{item.description} </Text>
                </>)
      })
       }
</>}
        </View>
      </View>
    </Page>
  </Document>
  );
}







