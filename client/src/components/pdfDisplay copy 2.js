import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image,PDFViewer } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import img1 from '../images/22.png'

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
});

const MyDocument = ({personalData}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.leftColumn}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Image style={styles.image} src={img1} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>Your Name</Text>
            <Text style={styles.designation}>Your Designation</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>{personalData.firstName}</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>

        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>


        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>


        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>


        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>


        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>


        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.paragraph}>Your profile text goes here.</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.paragraph}>Your skills go here.</Text>
      </View>

      <View style={styles.rightColumn}>
        <Text style={styles.sectionTitle}>Education</Text>
        <Text style={styles.paragraph}>Your education details go here.</Text>

        <Text style={styles.sectionTitle}>Internships</Text>
        <Text style={styles.paragraph}>Your internship details go here.</Text>

        <Text style={styles.sectionTitle}>Hobbies</Text>
        <Text style={styles.paragraph}>Your hobbies go here.</Text>

        <Text style={styles.sectionTitle}>Languages</Text>
        <Text style={styles.paragraph}>Your languages go here.</Text>
      </View>
    </Page>
  </Document>
);

function PdfDisplay({personalData}) {
  const handleGeneratePDF = () => {
    const pdfBlob = MyDocument.toBlob();
    saveAs(pdfBlob, 'resume.pdf');
  };

  return (
    <div>
      <button onClick={handleGeneratePDF}>Download PDF</button>
      <div style={{ margin: '20px' }}>
        <PDFViewer width={600} height={400}>
          <MyDocument  personalData={personalData}/>
        </PDFViewer>
      </div>
    </div>
  );
}

export default PdfDisplay;
