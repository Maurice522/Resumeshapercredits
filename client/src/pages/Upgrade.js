import React, { useEffect, useState } from "react";
import "../styleSheet/Upgrade.css";
import { Power, ArrowLeft, DatabaseFill } from "react-bootstrap-icons";
import FooterReverse from "../components/footerreverse";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import znc from "./../data/zoneandcountry";

const Upgrade = () => {

  const countries = znc.countries;

  const zones = znc.zones;

  const usdbasicPlan = {
    sym:"$",
    planName: "20",
    intialPrice: 25,
    price: 19,
    duration: "save 24%",
    features: [
      "Standard Templates",
      "Basic Editing Tools",
      "1 Resume Download/Month",
      "Email Support",
      "User-Friendly Interface",
      "Quick Resume Building",
    ],
  };

  const usdproPlan = {
    sym:"$",
    planName: "50",
    intialPrice: 69,
    price: 45,
    duration: "save 34.78%",
    features: [
      "Advanced & Industry-Specific Templates",
      "Full Editing Suite",
      "Unlimited Resume Downloads",
      "Priority Email Support",
      "Resume Analytics Dashboard",
      "Customizable Layout Options",
      "24/7 Customer Assistance",
    ],
  };

  const usdpremiumPlan = {
    sym:"$",
    planName: "125",
    intialPrice: 156.25,
    price: 89,
    duration: "save 43.04%",
    features: [
      "Exclusive AI-Enhanced Templates",
      "AI Content Enhancement",
      "Priority Email & Live Chat Support",
      "Unlimited Resume Downloads",
      "Personalized Resume Review by Experts",
      "Access to Future Feature Beta Releases",
      "Intuitive Drag-and-Drop Editor",
      "Advanced Resume Insights",
    ],
  };

  const usdmaxPlan = {
    sym:"$",
    planName: "200",
    intialPrice: 250,
    price: 125,
    duration: "save 50%",
    features: [
      "Exclusive AI-Enhanced Templates",
      "AI Content Enhancement",
      "Priority Email & Live Chat Support",
      "Unlimited Resume Downloads",
      "Personalized Resume Review by Experts",
      "Access to Future Feature Beta Releases",
      "Intuitive Drag-and-Drop Editor",
      "Advanced Resume Insights",
    ],
  };

  const basicPlan = {
    sym:"₹",
    planName: "20",
    intialPrice: 79,
    price: 59,
    duration: "save 25.32%",
    features: [
      "Standard Templates",
      "Basic Editing Tools",
      "1 Resume Download/Month",
      "Email Support",
      "User-Friendly Interface",
      "Quick Resume Building",
    ],
  };

  const proPlan = {
    sym:"₹",
    planName: "50",
    intialPrice: 200,
    price: 129,
    duration: "save 35.18%",
    features: [
      "Advanced & Industry-Specific Templates",
      "Full Editing Suite",
      "Unlimited Resume Downloads",
      "Priority Email Support",
      "Resume Analytics Dashboard",
      "Customizable Layout Options",
      "24/7 Customer Assistance",
    ],
  };

  const premiumPlan = {
    sym:"₹",
    planName: "125",
    intialPrice: 499,
    price: 249,
    duration: "save 50.1%",
    features: [
      "Exclusive AI-Enhanced Templates",
      "AI Content Enhancement",
      "Priority Email & Live Chat Support",
      "Unlimited Resume Downloads",
      "Personalized Resume Review by Experts",
      "Access to Future Feature Beta Releases",
      "Intuitive Drag-and-Drop Editor",
      "Advanced Resume Insights",
    ],
  };

  const maxPlan = {
    sym:"₹",
    planName: "200",
    intialPrice: 799,
    price: 379,
    duration: "save 52.57%",
    features: [
      "Exclusive AI-Enhanced Templates",
      "AI Content Enhancement",
      "Priority Email & Live Chat Support",
      "Unlimited Resume Downloads",
      "Personalized Resume Review by Experts",
      "Access to Future Feature Beta Releases",
      "Intuitive Drag-and-Drop Editor",
      "Advanced Resume Insights",
    ],
  };
  const navigate = useNavigate();

  const [userRegion, setUserRegion] = useState();
  const [userCity, setUserCity] = useState();
  const [userCountry, setUserCountry] = useState();
  const [userTimeZone, setUserTimeZone] = useState();

  useEffect(()=>{
    var temptimeZoneToCountry = {};
    var tempUserRegion;
    var tempUserCity;
    var tempUserCountry;
    var tempUserTimeZone;
    Object.keys(zones).forEach(z => {
      // temptimeZoneToCountry[z] = countries[zones[z].countries[0]].name;
      const cityArr = z.split("/");
      const city = cityArr[cityArr.length-1];
      temptimeZoneToCountry[city] = countries[zones[z].countries[0]].name;
    });

    temptimeZoneToCountry.Calcutta = "India";

    if (Intl) {
      tempUserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      var tzArr = tempUserTimeZone.split("/");
      tempUserRegion = tzArr[0];
      tempUserCity = tzArr[tzArr.length - 1];
      tempUserCountry = temptimeZoneToCountry[tempUserCity];

      setUserCity(tempUserCity)
      setUserCountry(tempUserCountry)
      setUserRegion(tempUserRegion)
      setUserTimeZone(tempUserTimeZone)
    }

    console.log("Time Zone:", tempUserTimeZone);
    console.log("Region:", tempUserRegion);
    console.log("City:", tempUserCity);
    console.log("Country:", tempUserCountry);

    console.log(temptimeZoneToCountry)
  },[])

  return (
    <div>
    <div className='upgrade-container'>
      <p style={{cursor:"pointer"}} onClick={() => window.history.go(-1)}>{"<- Back"}</p>
      <div className='upgrade-Upper'>
        <h3>Unlock the power of Resume Shaper</h3>
        <p>Choose a plan according to your needs</p>
      </div>
      <div className="cards-container">
      {userCountry == "India"? <>
      <div className='upgradeCards'>
        <Card {...basicPlan} />
        <Card {...proPlan} />
      </div>
      <div className='upgradeCards' style={{marginTop:"10%"}}>
        <Card {...premiumPlan} />
        <Card {...maxPlan} />
      </div>
      </>:<>
      <div className='upgradeCards'>
        <Card {...usdbasicPlan} />
        <Card {...usdproPlan} />
      </div>
      <div className='upgradeCards' style={{marginTop:"10%"}}>
        <Card {...usdpremiumPlan} />
        <Card {...usdmaxPlan} />
      </div>
      </>}
      
      </div>
    </div>
      <FooterReverse />
    </div>
  );
};

export default Upgrade;

const Card = ({ planName, price, intialPrice, features, duration, sym}) => {
  const navigate = useNavigate();
  
  const clickHandler = (e)=>{
    // toast.info("Payment is not in Beta version!")

    const plan = {
      planName,
      sym,
      intialPrice,
      price,
      duration,
      features
    }
    if(sym == "₹"){

      navigate("/payment",{ state: { price,sym } })
    }else{
      navigate("/paypal",{state:{plan}})
    }
  }
  return (
    <div className='card zoom'>
      <div className='cardUpper'>
        <h4>{planName} <DatabaseFill
            color='#347571'
            size={22}
            style={{ position: "relative", top: "-3px" }}
          /></h4>
        <h2>
          <del style={{ fontSize: "21px", marginBottom:"100px" }}>{sym}{intialPrice}</del> {sym}{price}
        </h2>
        <h6 style={{ color:"black"}}>{duration}</h6>
        <button onClick={(e) => clickHandler(e)} style={{backgroundColor:"#347571", color:"white", padding:"6px 15px", border:"none", borderRadius:"25px", marginTop:"5px"}}>Upgrade Plan</button>
      </div>
      <div className='cardBottom'>
        {/* <ul className='custom-list'>
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};
