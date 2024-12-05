import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import styles from "./PaymentMentorMeetingSchedule.module.css";
import CashfreeDropInCont from "./CashfreeDropInCont";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PaymentMentorMeetingSchedule = () => {
  const user = useSelector((state) => state.user.user);
  const [paymentModeOn,setPaymentModeOn ] = useState()
  const [paymentMade,setPaymentMade ] = useState()
  const [mentorPlanPrice, setMentorPlanPrice] = useState();
  const [sessionIdTokken, setSessionIdTokken] = useState(null);
  const [currency, setCurrency] = useState("USD")
  const [symbol, setSymbol] = useState("$")

  const location = useLocation();

  useEffect(() => {
    var price;
    var sym;
    if(location.state != null){
      price = location.state.price;
      sym = location.state.sym;

      if(sym == "$"){
        setCurrency("USD")
        setSymbol("$")
      }else{
        setCurrency("INR")
        setSymbol("₹")
      }
    }
    setMentorPlanPrice(price);
  }, []);

  //GENERATE RANDOM UNIQUE ID
  const uuid = () => {
    const val1 = Date.now().toString(36);
    const val2 = Math.random().toString(36).substring(2);

    return val1 + val2;
  };

  //GENERATE EXPIRY DATE
  function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  const handlePaymentClick = async () => {

    toast("Processing Your Request");
    const bodyData = {
      id: `order_${uuid()}`,
      amount: `${mentorPlanPrice}`,
      currency: currency,
      customer_id: uuid(),
      customer_phone: "+919876543210",

    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    };
    console.log(bodyData);
  
    axios
      .post("https://server.reverr.io/webcftoken/rs", bodyData)
      .then((res) => {
        setSessionIdTokken(res.data.token);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  console.log(user)
  console.log(currency)

  return (
    <>
      <section className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <ToastContainer />
          {sessionIdTokken !== null ? (
            <CashfreeDropInCont
              currency = {currency}
              sessionIdTokken={sessionIdTokken}
              mentorDetails={mentorPlanPrice}
              setSessionIdTokken={setSessionIdTokken}
              userDoc={user}
              setPaymentModeOn={setPaymentModeOn}
              setPaymentMade={setPaymentMade}
            />
          ) : null}
          {sessionIdTokken === null ? (
            <div className={styles.makePaymentContainer}>
              
              <h1 className={styles.makePaymentContainerHeading}>
                Make Payment
              </h1>
              <p className={styles.makePaymentContainerSubText}>
                User Name :{" "}
                <span className={styles.makePaymentContainerAmount}>
                  {user?.name}
                </span>
              </p>
              <p className={styles.makePaymentContainerSubText}>
                User Email :{" "}
                <span className={styles.makePaymentContainerAmount}>
                  {user?.email}
                </span>
              </p>
              <p className={styles.makePaymentContainerSubText}>
                User Mobile Number :{" "}
                <span className={styles.makePaymentContainerAmount}>
                  {user?.phone}
                </span>
              </p>
              
              <p className={styles.makePaymentContainerSubText}>
                Amount To Be Paid :{" "}
                <span className={styles.makePaymentContainerAmount}>
                  {symbol} {mentorPlanPrice}
                </span>
              </p>
              <button
                className={styles.makePaymentContainerPayButton}
                onClick={handlePaymentClick}
              >
                Pay
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default PaymentMentorMeetingSchedule;
