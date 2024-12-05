import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import img1 from '../images/26.png'
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

export default function MyPdfViewerTest({name,photo}) {
  // const [name, setName] = useState("NAME")


  
  return (
    <Document>
      <Page>
        <View>
          <Text>{name}</Text>
          <Image src={photo}/>
        </View>
      </Page>
    </Document>

  );
}
