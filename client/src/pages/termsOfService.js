import React from "react";
import Nav from "../components/nav";
import "../styleSheet/AboutUs.css";
import img1 from "../images/aboutUs.png";
import Footer from "../components/footer";
import { Power, ArrowLeft, DatabaseFill } from "react-bootstrap-icons";
import { signOut } from "firebase/auth";
import { auth } from "../fireabse";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handler = (e) => {
    signOut(auth)
      .then(() => {
        dispatch(signOutUser());
        console.log("signed out successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const returnBack = (e) => {
    navigate("/");
  };
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      {user && user.profile && (
        <button
          onClick={() => handler()}
          className=' btn btn-success signoutBtn aboutUsSignOutBtn'
        >
          {" "}
          <Power color='#35b276' size={22} /> &nbsp;Signout
        </button>
      )}
      {/* {user&&user.profile&&user.credits&&<button  className="tokensBtn"> <Coin color="#35b276" size={22} style={{"position":"relative","top":"-2px"}}/> {user.credits} &nbsp;Credits</button>}   */}
      {user && user.profile && user.credits && (
        <button
          className='tokensBtn'
          style={{
            right: "17%",
            fontFamily: "Open Sans",
            fontWeight: "550",
            fontSize: "16px",
            color: "#347571",
          }}
        >
          <DatabaseFill
            color='#347571'
            size={24}
            style={{ position: "relative", top: "-2px" }}
          />{" "}
          &nbsp;{user.credits} Credits
        </button>
      )}
      <Nav />
      <div className='aboutUsContainer'>
        <h1 className='aboutUsHeadig'>
          <ArrowLeft
            color='#35b276'
            size={30}
            className='returnBackArrow'
            onClick={() => returnBack()}
          />
          Terms And Conditions
        </h1>
        <hr></hr>

        <p className='aboutUsContent'>
          <h6 style={{ marginTop: "5%" }}>
            Last updated date: [11th Nov,2023]
          </h6>
          <p>
            These Terms and Conditions ("Terms") govern your use of the services
            provided by SaaSmartSolutions ("we," "our," or "us"). By accessing
            or using our website, products, or services, you agree to comply
            with and be bound by these Terms. If you do not agree to these
            Terms, please refrain from using our services.
          </p>
          <h5 style={{ marginTop: "5%" }}>1. Use of Services</h5>
          <p>1.1. Eligibility: </p>
          <p>
            You must be at least 18 years old to use our services. By using our
            services, you represent that you meet this eligibility requirement.
          </p>
          <p>1.2. User Account:</p>
          <p>
            {" "}
            To access certain features, you may be required to create a user
            account. You are responsible for maintaining the confidentiality of
            your account information and for all activities that occur under
            your account.
          </p>
          <h5 style={{ marginTop: "5%" }}>2. Intellectual Property</h5>
          <p>2.1. Ownership:</p>
          <p>
            {" "}
            All content, logos, and intellectual property on our website and
            services are owned or licensed by SaaSmartSolutions. You agree not
            to reproduce, distribute, or create derivative works without our
            express consent.
          </p>
          <h5 style={{ marginTop: "5%" }}>3. User Conduct</h5>
          <p>3.1. Prohibited Activities:</p>
          <p>
            {" "}
            You agree not to engage in any activities that may: a. Violate any
            laws or regulations. b. Infringe upon the rights of others. c.
            Interfere with the operation of our services. d. Transmit harmful
            code or content.
          </p>
          <h5 style={{ marginTop: "5%" }}>4. Privacy</h5>
          <p>4.1. Privacy Policy:</p>
          <p>
            {" "}
            Your use of our services is also governed by our Privacy Policy. By
            using our services, you consent to the collection and use of your
            information as described in the Privacy Policy.
          </p>
          <h5 style={{ marginTop: "5%" }}>
            5. Disclaimers and Limitation of Liability
          </h5>
          <p>5.1. Disclaimer: </p>
          <p>
            Our services are provided "as is" without any warranties, express or
            implied. We do not guarantee the accuracy, reliability, or
            availability of our services. 5.2. Limitation of Liability:
          </p>
          <p>
            {" "}
            To the extent permitted by law, we shall not be liable for any
            direct, indirect, incidental, special, or consequential damages
            arising out of or in any way connected with your use of our
            services.
          </p>
          <h5 style={{ marginTop: "5%" }}>6. Termination</h5>
          <p>6.1. Termination:</p>
          <p>
            {" "}
            We reserve the right to terminate or suspend your access to our
            services at our sole discretion, without notice, for any reason,
            including but not limited to a violation of these Terms.
          </p>
          <h5 style={{ marginTop: "5%" }}>7. Governing Law</h5>
          <p>7.1. Governing Law:</p>
          <p>
            {" "}
            These Terms shall be governed by and construed in accordance with
            the laws of [Your Jurisdiction].
          </p>
          <h5 style={{ marginTop: "5%" }}>8. Changes to Terms</h5>
          <p>8.1. Modification:</p>
          <p>
            {" "}
            We reserve the right to modify these Terms at any time. Changes will
            be effective upon posting on our website. Your continued use of our
            services after the posting of changes constitutes your acceptance.
          </p>
          <h5 style={{ marginTop: "5%" }}>9. Contact Us</h5>
          <p>9.1. Contact Information:</p>
          <p>
            {" "}
            If you have any questions or concerns regarding these Terms, please
            contact us at [legal@saasmartsolutions.com].
          </p>
        </p>
      </div>
      <Footer />
    </div>
  );
}
