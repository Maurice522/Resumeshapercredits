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

Font.register({ family: 'Roboto', src: 'https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins:wght@300&family=Roboto:wght@300&display=swap' });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 30, // Add padding here
    color:'#3E3F4E',
    paddingTop:30 ,
    paddingBottom:0 ,
    paddingleft:0,
    paddingRight:15,
    position:'relative'
  },
  leftColumn: {
    width: '35%',
    padding: 0,
    color:'white',
    backgroundColor:'#102429',
    position:'absolute',
    top:0,
    bottom:0,
    paddingLeft:10,
    paddingRight:13,
    paddingTop:35
      },
  rightColumn: {
    width: '65%',
    padding: 10,
    marginLeft:'33%',
    paddingRight:4
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    marginBottom:5,
    marginTop:5
  },
  designation: {
    fontSize: 15,
    margin:12,
    paddingLeft:5,
    paddingRight:5,
    textAlign:'center',
    color:'#62a844'
  },
  sectionTitle: {
    fontSize: 16,
    color:'#1E2532',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    paddingLeft: 18,
    paddingTop:7,
    textAlign:'justify',
    lineHeight:1.4
  },
  subTitle:{
    fontSize: 13,
    paddingLeft: 18,
    paddingTop:7,
    textAlign:'left',
  },
  subSubTitle:{
    fontSize: 10,
    paddingLeft: 18,
    paddingTop:3,
    textAlign:'left',
  },
  hobbies: {
    marginTop: 95 // Add top padding to Hobbies
  },
  image: {
    width: 65,
    height: 65,
    borderRadius:100,
  },
  icon1:{
    width:11,
    height:12,
  },
  rightHeading:{
    marginTop: 25,
    fontSize:15,
    paddingLeft: 18,
    marginBottom:8,
  },
  rightParagraph:{
    fontSize: 12,
    marginBottom: 4,
    paddingLeft: 18,
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
    marginTop:13,
    color:'#16598F',
  },
  colorThisBlue:{
    color:'#62a844'

  },
  colorThisGrey:{
    color:'#828BA2'
  },
  colorThisBlack:{
    color:'white',
    fontWeight: 'bold',
  },
  line: {
    height: 1, // Line height
    width: '20%', // 20% for the line
    backgroundColor: '#1A91F0', // Line color
    marginTop: 6, // Adjust this value for spacing
    color:'#1A91F0',
  },

});


export default function BEDocTemp3({imgFile, personalData,courses, activities,internships,hobbies,languages,references ,customSections ,skills }) {
  console.log(personalData)
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.leftColumn}>
      <View style={{ alignItems: 'center' }}>
          {/* <Image style={styles.image} src={imgFile===null? img1:imgFile} /> */}
          {imgFile &&  <Image style={styles.image} src={imgFile}/> }
        </View>
        <View style={{alignItems: 'center', marginTop:8,width:"100%",paddingRight:'4%' }}>
            <Text style={styles.name}>{personalData.firstName} {personalData.middleName} {personalData.lastName}</Text>
            <View style={styles.line}></View>
            <Text style={styles.designation}>{personalData.jobTitle}</Text>
          </View>
      <Text style={[styles.rightHeading,styles.colorThisBlack]}>Personal Details</Text>
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
          
          {/* {personalData.dateOfBirth && personalData.dateOfBirth.length >0 && <>
          <Text style={[styles.rightSubHeading,styles.colorThisGrey]}>DOB/Place of Birth</Text>
          <Text style={styles.rightParagraph}>{personalData.dateOfBirth}</Text>
          </>} */}

          {personalData.placeOfBirth && personalData.placeOfBirth.length >0 &&  <>
          <Text style={styles.rightParagraph}>{personalData.placeOfBirth}</Text>
          </>}

          {personalData.nationality && personalData.nationality.length >0 &&  <>
          <Text style={[styles.rightSubHeading,styles.colorThisGrey]}>Nationality</Text>
          <Text style={styles.rightParagraph}>{personalData.nationality}</Text>
          </>}

           {personalData.drivingLicense && personalData.drivingLicense.length >0 && <>
          <Text style={[styles.rightSubHeading,styles.colorThisGrey]}>Driving Liscence</Text>
          <Text style={styles.rightParagraph}>{personalData.drivingLicense}</Text>
          </>}

          {personalData.websitesLinks && personalData.websitesLinks.length >0 && personalData.websitesLinks[0].name!=='' && <>
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Links</Text>
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
          {skills.map((item,index)=>{
            
          return (<Text style={[styles.rightParagraph,styles.colorThisBlue]}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>)
          })
          }</>}
         

         {languages && languages.length>0 && <>
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Languages</Text>
          {languages.map((item,index)=>{
            return(<>
              <Text style={styles.rightParagraph}>{item.language}</Text>
          <Text style={[styles.rightParagraph]}>({item.level})</Text>
            </> )
          })
        }</>}
         

         {hobbies && hobbies.length>0 && <>      
          <Text style={[styles.rightOtherHeading,styles.colorThisBlack]}>Hobbies</Text>
          <Text style={styles.rightParagraph}>{hobbies}</Text>
          </>}
      
      </View>

      <View style={styles.rightColumn}>

      {personalData.professionalSummary && personalData.professionalSummary.length >0 && <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.icon1} src={img2} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>Profile</Text>
          </View>
        </View>
        <Text style={styles.paragraph}>{personalData.professionalSummary} </Text>
        </>}

        {personalData.employmentHistory && personalData.employmentHistory.length >0 && personalData.employmentHistory[0].jobTitle!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img3} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>Employment History</Text>
          </View>
        </View>
        { personalData.employmentHistory.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.jobTitle} at {item.employer} , {item.city}</Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate} </Text>
        <Text style={styles.paragraph}>{item.description} </Text>
        </>)
      })
       }
        </>}

{personalData.educationHistory && personalData.educationHistory.length >0 && personalData.educationHistory[0].school!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img4} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
        </View>
        { personalData.educationHistory.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.school}, {item.city}</Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.degree}, {item.startDate} - {item.endDate}  </Text>
        <Text style={styles.paragraph}>{item.description} </Text>
        </>)
        })
         }
</>}


{internships && internships.length >0 && internships[0].jobTitle!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img5} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>Internships</Text>
          </View>
        </View>
        { internships.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.jobTitle} at {item.employer}, {item.city} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate} </Text>
        <Text style={styles.paragraph}>{item.description}</Text>
        </>)
        })
         }
</>}     
      

{references && references.length >0 && references[0].fullName!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img6} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>References</Text>
          </View>
        </View>
        { references.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.fullName}, {item.company} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.phone} </Text>
        <Text style={styles.paragraph}>{item.referenceEmail} </Text>
        </>)
        })
         }
</>}  

{courses && courses.length >0 && courses[0].course!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img7} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>Courses</Text>
          </View>
        </View>
        { courses.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.course}, {item.institution} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate}</Text>
        <Text style={styles.paragraph}>{item.description} </Text>
        </>)
        })
         }
</>}

{activities && activities.length >0 && activities[0].function!=='' && <>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img8} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>Extra-Curriculum Activities</Text>
          </View>
        </View>
        { activities.map((item,index)=>{
          return (<>
        <Text style={styles.subTitle}>{item.function}, {item.employer} , {item.city} </Text>
        <Text style={[styles.subSubTitle,styles.colorThisGrey]}>{item.startDate} - {item.endDate} </Text>
        <Text style={styles.paragraph}>{item.description} </Text>
        </>)
        })
         }
</>}

{customSections && customSections.length >0 && customSections[0].subTitle!=='' && <>
{ customSections.map((item,index)=>{
          return (<>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'10'}}>
          <Image style={styles.icon1} src={img9} />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.sectionTitle}>{item.title}</Text>

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
    </Page>
  </Document>
  );
}
