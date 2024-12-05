import React, { useEffect, useState } from 'react';
import '../styleSheet/createUpload.css'
import img3 from '../images/28.png'
import { updateUserCreditsInDatabase, updateUserInDatabase, uploadMedia } from '../fireabse';
import { useDispatch, useSelector } from 'react-redux';
import { updateCredits, updateResume } from '../redux/slices/user';
import { Tooltip } from 'react-tooltip'
import { toast } from 'react-toastify';
import { DatabaseFill} from "react-bootstrap-icons";

export default function CreateUploadPopup({ onClose, personalData, setPersonalData}) {
  

  const [numPages, setNumPages] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const [file, setFile] = useState(null);
  const [upload, setUpload] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.user.user)

  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
   
    setUpload(true)
    
  };

  const handleBack = ()=>{
    setUpload(false)

  };

  const handleUploadResume = async() => {   
    if (file) {
      const cost = 4;
      if(user.credits >= cost){
      setLoading(true)
      const fileLink = await uploadMedia(file, "resume");
      await updateUserInDatabase(user.email, fileLink)
      // dispatch(updateResume(fileLink))
      
      var gotResult = false;

      var attempts = 1;
      var totalAttempts = 3;

      while(gotResult == false){

        var res = await fetch('https://resumeapi-paem.onrender.com/extract', {
          method: 'POST',
          body: JSON.stringify({
          pdf_url:fileLink
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson)
          return responseJson;
        })

        if(res.error){
          toast.error("Network Error")
          toast.info(`Attempt ${attempts} of ${totalAttempts}`)
          attempts++;
        }else{
          gotResult = true;
        }

        if(attempts>totalAttempts){
          attempts++;
          gotResult = true;
        }
      }
      
     if(attempts>totalAttempts){
      toast.error("Technical Difficulties Try Again Later")
     }else{
      await updateUserCreditsInDatabase(user.email, user.credits-cost)
      dispatch(updateCredits(user.credits-cost));
      // delete res.professionalSummary;

      var webnlinks=[];
      if(res.websitesLinks)
      res.websitesLinks.map((item,index)=>{
        if(item.url!==''&&item.url[0]=="h"){
          webnlinks = [...webnlinks, item]
        }
      })

      if(webnlinks.length>0 && res.websitesLinks){
        res.websitesLinks = webnlinks;
      }else{
        delete res.websitesLinks;
        res.websitesLinks = [
          {
            name: '',
            url: '',
          },
        ];
      }

      res.websitesAndLinks = res.websitesLinks;

      toast.success("Your document got processed!")
      setPersonalData(res)
      console.log(res)
     }

      setLoading(false) 
      onClose();

      if(attempts > totalAttempts){
        onClose(true)
      }
      
    }else{
      setLoading(false)
      console.log("Not enough credits");
      onClose();
      return toast.error("Not Enough Credits!")
     
    }
    }
  };

  return (
    <div className="homePpopup">
      <div className="popup-content">

        {loading? 
        <>
        {/* <img width="480" height="320" alt='loading...' src='https://media0.giphy.com/media/daak2Jqk5NZN2G4PKD/giphy.gif?cid=ecf05e47cgp9tyccc55lm02fihptwokn5kx9zvu877ix5b7j&ep=v1_gifs_related&rid=giphy.gif&ct=g' /> */}
        <img width="460" height="320" alt='loading...' src='https://media1.giphy.com/media/emHFjFhg9Ha0wQjihU/giphy.gif?cid=ecf05e47hk4qemarhmgqkea2nnod6ccd9puf27jnwfx9l21i&ep=v1_gifs_search&rid=giphy.gif&ct=g' />
        {/* <iframe src="https://giphy.com/embed/daak2Jqk5NZN2G4PKD" width="480" height="320" frameBorder="0" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/daak2Jqk5NZN2G4PKD"></a></p> */}
        </>
        :<>
        <h2 className='homeHeader'>
          <img src={img3} className='popupImg' />
          Welcome to Resume Builder</h2>
          <p><i>Thank you for signing up with us. You have received 100 Credits as a bonus! Let's get ready to build your dream resume!</i></p>
          { !upload && <p className='homeSelectOption'>Select an Approach:</p>}
        { !upload && <button onClick={onClose} className="newResumeBtn ">Create a Fresh Resume</button>}
        { upload &&<> 
          <div className="mb-3">
          <label for="formFile" className="uploadResumeInput form-label">Choose Your Resume</label>
          <input className="uploadResumeInput form-control" type="file" accept=".pdf" id="formFile" onChange={handleFileChange} />
          </div>
          </>
        }
        { !upload &&<button className='homePopupBtn  ' style={{'position':'relative'}} onClick={handleUpload} data-tooltip-id="uploadNewUserResumeInfo" data-tooltip-content="This will cost 4 credits">Upload your Resume <span style={{'position':"absolute",'right':'6%'}}> 4 <DatabaseFill  color="white" size={16} style={{"position":"relative","top":"-2px"}} /></span></button>}
        <Tooltip id="uploadNewUserResumeInfo" />
        { upload && <button className='homePopupBtnShort  ' onClick={handleBack}>Back</button>}
        { upload && <button className='homePopupBtnShort  ' onClick={handleUploadResume}>Upload</button>}
        </>}
      </div>
    </div>
  );
};

