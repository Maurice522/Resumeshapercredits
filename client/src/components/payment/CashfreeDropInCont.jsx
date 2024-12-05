import { cashfreeSandbox, cashfreeProd } from "cashfree-dropjs";
import { useState } from "react";
import { dropinComponents } from "./DropInComments";
import styles from "./CashfreeDropInCont.module.css";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createMentorInMessagesDoc, db } from "../../fireabse";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCredits } from "../../redux/slices/user";

function CashfreeDropInCont({
  currency,
  sessionIdTokken,
  mentorDetails,
  setSessionIdTokken,
  userDoc,
  setPaymentModeOn,
  setPaymentMade,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderToken, setOrderToken] = useState(sessionIdTokken);
  const [orderDetails, setOrderDetails] = useState(null);
  // const user=useSelector((state)=>state.user)

  const [checkedState, setCheckedState] = useState(
    new Array(dropinComponents.length).fill(true)
  );
  const [style, setStyle] = useState({});
  const [isProd, setIsProd] = useState(true);
  const [components, setComponents] = useState([
    "order-details",
    "card",
    "upi",
    "netbanking",
    "internationalwallet"
  ]);
  const cbs = (data) => {
    console.log(data, "sucess");
    setOrderDetails(data);
    // if (data.order && data.order.status === 'PAID') {
    //   alert('order is paid. Call api to verify');
    // }
  };
  const cbf = (data) => {
    // alert(data.order.errorText || 'ERROR');
    console.log(data, "errro data");
    setOrderDetails(data);
  };

  const renderDropin = () => {
    if (orderToken === "") {
      toast.error("Order Token is empty");
      return;
    }
    if (!components.length) {
      toast.error("No drop in specified");
      return;
    }
    let parent = document.getElementById("drop_in_container");
    parent.innerHTML = "";
    let cashfree;
    if (isProd) {
      cashfree = new cashfreeProd.Cashfree();
    } else {
      cashfree = new cashfreeSandbox.Cashfree();
    }

    cashfree.initialiseDropin(parent, {
      orderToken,
      onSuccess: cbs,
      onFailure: cbf,
      components,
      style,
    });
  };

  //GENERATE RANDOM UNIQUE ID
  const uuid = () => {
    const val1 = Date.now().toString(36);
    const val2 = Math.random().toString(36).substring(2);

    return val1 + val2;
  };

  //MAKE PAYMENT DROP DOWN
  useEffect(() => {
    console.log(currency)
    renderDropin();
  }, []);

  //ACTION AFTER PAYMENT IS DONE OR FAILED
  useEffect(() => {
    if (orderDetails === null) {
      return;
    }
    const { order, transaction } = orderDetails;
    if (transaction.txStatus === "FAILED") {
      onFailedPayment(order, transaction);
      return;
    }
    if (transaction.txStatus === "SUCCESS") {
      onSuccessfulPayment(order, transaction);
    }
  }, [orderDetails]);

  //INITIALIZE SPLIT PAYMENT
  // const initiateSplitPayment = async (order) => {
  //   const bodyData = {
  //     orderId: order.orderId,
  //     vendorId: "lc7g5jxgug396jgv",
  //     amount: mentorDetails,
  //     secrett: "2V7W@ODU6HTRS1GY$54JQ*EP0F8N%9!BI&AXKML3#ZCQ!$3U",
  //   };

  //   await axios
  //     .post("https://server.reverr.io/webSplitPayment", bodyData)
  //     .then((res) => {
  //       console.log("success split", res.data.message);
  //     })
  //     .catch((err) => {
  //       console.log("Failure Split", err.message);
  //     });
  // };

  //ACTION PERFORM ON SUCESSFUL PAYMENT

  const calculateCredits = (price)=>{
    var credits = 0;
    if(currency == "INR"){
      if(price == 59){
        credits = 20;
      }else if(price == 129){
        credits = 50;
      }else if(price == 249){
        credits = 125;
      }else if(price == 379){
        credits = 200
      }
    }else{
      if(price == 19){
        credits = 20;
      }else if(price == 45){
        credits = 50;
      }else if(price == 89){
        credits = 125;
      }else if(price == 125){
        credits = 200
      }
    }
    

    return credits;
  }

  const onSuccessfulPayment = async (order, transaction) => {
    // initiateSplitPayment(order);
    await setDoc(doc(db, "Payments", order.orderId), {
      orderAmount: transaction.transactionAmount,
      orderId: order.orderId,
      paymentMode: order.activePaymentMethod,
      transactionId: transaction.transactionId,
      txStatus: transaction.txStatus,
      user: userDoc?.email,
      referenceId: "",
      signature: "",
      txTime: "",
      currency,
      time: Date.now(),
    })

    let payments = []

    if(userDoc.payments){
      payments = [...userDoc.payments, order.orderId]
    }else{
      payments = [order.orderId]
    }

    let credits = userDoc.credits + calculateCredits(transaction.transactionAmount)
    console.log(credits)
    await updateDoc(doc(db,"users",userDoc?.email),{payments,credits});
    dispatch(updateCredits(credits))    

    navigate("/paymentsuccess")
  };

  //ACTION PERFORM ON FAILED PAYMENT

  const onFailedPayment = async (order, transaction) => {
    setSessionIdTokken(null);
    await setDoc(doc(db, "Payments", order.orderId), {
      orderAmount: transaction.transactionAmount,
      orderId: order.orderId,
      paymentMode: order.activePaymentMethod,
      transactionId: transaction.transactionId,
      txStatus: transaction.txStatus,
      user: userDoc?.email,
      referenceId: "",
      signature: "",
      txTime: "",
      currency,
      time: Date.now(),
    })

    let payments = []

    if(userDoc.payments){
      payments = [...userDoc.payments, order.orderId]
    }else{
      payments = [order.orderId]
    }

    await updateDoc(doc(db,"users",userDoc?.email),{payments});

    navigate("/paymentfailed")

  };

  //UPDATE DATA IN USER DATABASE
  
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
    let comp = [];
    updatedCheckedState.forEach((item, index) => {
      if (item) {
        comp.push(dropinComponents[index].id);
      }
    });
    setComponents(comp);
  };

  const handleStyleChange = () => (e) => {
    setStyle({
      ...style,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className={styles.App}>
      {/* <header className={styles.App_header}>
        <p className={styles.App_link}>
          PAYMENT GATEWAY
          <p className={styles.warningMessage}>
            Note: Do Not Refresh This Page!!
          </p>
        </p>
      </header> */}
      {/* <div className={`${styles.mt_1} ${styles.mb_1}`}>
        <span className={`${styles.order_token} ${styles.mr_8}`}>Order Token :</span>
        <input
          type="text"
          placeholder="order_token"
          id="orderToken"
          value={orderToken}
          className={styles.inputText}
          readonly
        />
      </div> */}
      {/* <p className={styles.order_token}>Choose components</p>
      <ul className={styles.toppings_list}>
        {dropinComponents.map(({ name, id }, index) => {
          return (
            <>
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                name={name}
                value={id}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
                key={id}
              />
              <label className={styles.mr_8} htmlFor={`custom-checkbox-${index}`}>
                {name}
              </label>
            </>
          );
        })}
      </ul> */}
      {/* <div style={{display:"none"}}>
        <p className={styles.order_token}>Style your Dropin</p>
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="backgroundColor"
          key="backgroundColor"
          placeholder="Background Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="theme"
          key="theme"
          placeholder="Theme"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="color"
          key="color"
          placeholder="Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="errorColor"
          key="errorColor"
          placeholder="Error Color"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="fontSize"
          key="fontSize"
          placeholder="Font Size"
          onChange={handleStyleChange()}
        />
        <input
          className={`${styles.style_dropin} ${styles.mr_1}`}
          type="text"
          id="fontFamily"
          key="fontFamily"
          placeholder="Font Family"
          onChange={handleStyleChange()}
        />
      </div> */}
      {/* <div style={{display:"none"}} className={styles.mt_2}>
        <input
          type="checkbox"
          name="prod"
          id="prod-check"
          checked={isProd}
          onChange={() => setIsProd(!isProd)}
        />
        <label className={styles.mr_8} htmlFor="prod-check">
          Production Mode
        </label>
      </div> */}
      {/* <button className={`${styles.btn_render} ${styles.mt_2}`} onClick={renderDropin}>
        Pay
      </button> */}
      <div className={styles.dropin_parent} id="drop_in_container">
        {/* Your component will come here */}
      </div>
    </div>
  );
}

export default CashfreeDropInCont;
