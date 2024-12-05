import React, { useRef, useEffect, useState } from "react";
import './paypal.css';
import img3 from '../../images/26.png'
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../nav";
import {
  DatabaseFill,

} from "react-bootstrap-icons";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { createMentorInMessagesDoc, db } from "../../fireabse";
import { useDispatch, useSelector } from "react-redux";
import { updateCredits } from "../../redux/slices/user";

export default function Paypal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDoc = useSelector((state) => state.user.user);
  const paypal = useRef();
  const location = useLocation();
  const [plan, setPlan] = useState(null);
  useEffect(() => {
    var plan;
    if(location.state != null){
      plan = location.state.plan;

      if(plan){
        setPlan(plan)
      }
    }

  }, []);

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "plan",
                amount: {
                  currency_code: "USD",
                  value: plan.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          var oid = generateString(16)
          await setDoc(doc(db, "Payments", oid), {
            ...order,
            ...plan,
            time: Date.now(),
          })
          let payments = []

          if(userDoc.payments){
            payments = [...userDoc.payments, oid]
          }else{
            payments = [oid]
          }

          let credits = plan.planName;
          console.log(credits)
          await updateDoc(doc(db,"users",userDoc?.email),{payments,credits});
          dispatch(updateCredits(credits))    

          navigate("/paymentsuccess")
        },
        onError: async (err) => {
          console.log(err);
          var oid = generateString(16)
          await setDoc(doc(db, "Payments", oid), {
            orderId:oid,
            ...plan,
            ...err,
            time: Date.now(),
          })
      
          let payments = []
      
          if(userDoc.payments){
            payments = [...userDoc.payments, oid]
          }else{
            payments = [oid]
          }
      
          await updateDoc(doc(db,"users",userDoc?.email),{payments});
      
          navigate("/paymentfailed")
        },
      })
      .render(paypal.current);
  }, []);
  
  return (
    <>
      <Nav />
    <div className="body">
      <div style={{padding:"70px 10px", paddingBottom:"100px"}}>
          <div className="wrapper">
          <div className="payment">
            <div className="payment-logo">
            <img src={img3} className="logo-ppl" />
            </div>
            <h2>Payment Gateway</h2>
            
            <div className="form-ppl">
            {plan!= null? <>
            <div className="textbox-ppl">
              <p className="text-ppl" >CREDITS : {plan.planName} <DatabaseFill
                        color='#347571'
                        size={22}
                        style={{ position: "relative", top: "-2px" }}
                      /></p>
              <p className="text-ppl">PRICE : {plan.sym} {plan.intialPrice}</p>
              <p className="text-ppl">DISCOUNT : {plan.duration.split(" ")[1]}</p>
              <p className="text-ppl">FINAL PRICE : {plan.sym} {plan.price}</p>
            </div>
            </>:null}  
              <div style={{ paddingTop:"5%",width:"50%" ,textAlign:"center", justifyContent:"center", margin:"auto"}} ref={paypal}></div>
              {/* <div className="btn-ppl">Pay</div> */}
            </div>
           
            
          </div>
        </div>
      
      </div>
    </div>
    </>
  );
}