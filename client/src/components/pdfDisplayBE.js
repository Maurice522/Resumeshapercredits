import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image,PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import img1 from '../images/22.png'
import BEDocTemp2 from './BEDocTemp2';
import Nav from './nav';
import BEDocTemp1 from './BEDocTemp1';
import BEDocTemp3 from './BEDocTemp3';
import BEDocTemp4 from './BEDocTemp4';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  leftColumn: {
    width: '70%',
    padding: 10,
  },
  rightColumn: {
    width: '30%',
    padding: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
  },
  designation: {
    fontSize: 14,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 80,
  },
  pDFViewerStyle:{
    // backgroundColor:"#ffffff" ,
    height:'100%',
    width:'65%'
  }
});



export default function PdfDisplayBE({imgFile, personalData,courses, activities,internships,hobbies,languages,references ,customSections ,skills,downloadPdf,setDownloadPdf,selectedTemplateId }) {
  console.log(personalData)
  return (
    <>
      <div className='downloadPdfMainDiv'>
        <button className='realBdfGoBackBtn zoom' onClick={()=>setDownloadPdf(false)}>Edit Pdf</button>
        <PDFViewer  style={styles.pDFViewerStyle}>
        {selectedTemplateId == 1 &&  <BEDocTemp1 imgFile={imgFile} personalData={personalData} courses={courses} activities={activities} internships={internships} hobbies={hobbies} languages={languages} references={references} customSections={customSections} skills={skills}/>}
        {selectedTemplateId == 2 &&  <BEDocTemp2 imgFile={imgFile} personalData={personalData} courses={courses} activities={activities} internships={internships} hobbies={hobbies} languages={languages} references={references} customSections={customSections} skills={skills}/>}
        {selectedTemplateId == 3 &&  <BEDocTemp3 imgFile={imgFile} personalData={personalData} courses={courses} activities={activities} internships={internships} hobbies={hobbies} languages={languages} references={references} customSections={customSections} skills={skills}/>}
        {selectedTemplateId == 4 &&  <BEDocTemp4 imgFile={imgFile} personalData={personalData} courses={courses} activities={activities} internships={internships} hobbies={hobbies} languages={languages} references={references} customSections={customSections} skills={skills}/>}         
        </PDFViewer>
      </div>
    </>
  );
}

