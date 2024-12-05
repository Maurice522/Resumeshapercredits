import React from "react";
import "../styleSheet/Landing.css";
import { useNavigate } from "react-router-dom";

export default function FooterReverse() {
  const navigate = useNavigate();
  return (
    <div style={{backgroundColor:"#ecf8e5", position:'relative', height:'70vh'}}>
      <div className="footerContent" style={{backgroundColor:"#ecf8e5"}}>
        <h4>RESUME SHAPER</h4>
        <h6 className="subHeadingSec6">
          Resumes Redefined, Success Rewritten.
        </h6>
        <div className="row footerLinks">
          <div className="col-md-4">
            <h6>Quick Links</h6>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/aboutus");
                window.scrollTo(0, 0);
              }}
            >
              About Us
            </p>
            <p
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 1440);
              }}
            >
              How It works
            </p>
            <p
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 2150);
              }}
            >
              Features
            </p>
            <p
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 2750);
              }}
            >
              Testimonials
            </p>
          </div>
          <div className="col-md-4">
            <h6>Privacy and Terms</h6>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/privacypolicy");
                window.scrollTo(0, 0);
              }}
            >
              Privacy Policy
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/termsandconditions");
                window.scrollTo(0, 0);
              }}
            >
              Terms Of Service
            </p>
          </div>
          <div className="col-md-4">
            <h6>Connect with us</h6>
            <p>Email: contact@resumeshaper.com</p>
            {/* <p>Phone : 456-345-2345</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}