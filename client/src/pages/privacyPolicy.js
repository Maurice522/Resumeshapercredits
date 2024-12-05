import React from "react";
import Nav from "../components/nav";
import "../styleSheet/AboutUs.css";
import img1 from "../images/aboutUs.png";
import Footer from "../components/footer";
import { Power, ArrowLeft } from "react-bootstrap-icons";
import { signOut } from "firebase/auth";
import { auth } from "../fireabse";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/slices/user";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
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
  const user = useSelector((state) => state.user.user);

  const returnBack = (e) => {
    navigate("/");
  };
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

      <Nav />
      <div className='aboutUsContainer'>
        <h1 className='aboutUsHeadig'>
          <ArrowLeft
            color='#35b276'
            size={30}
            className='returnBackArrow'
            onClick={() => returnBack()}
          />
          Privacy Policy
        </h1>
        <hr></hr>

        <p className='aboutUsContent'>
          <h6>Last updated date: [11th Nov,2023]</h6>
          <p>
            SaaSmartSolutions ("we," "our," or "us") is dedicated to
            safeguarding your privacy and ensuring the security of your personal
            information. This Privacy Policy outlines our practices regarding
            the collection, use, disclosure, and protection of your data when
            you engage with our website, products, or services.
          </p>
          <h6>Information We Collect</h6>
          <p>Personal Information</p>
          <p>
            We may collect personal information, including but not limited to:
          </p>
          <ul itemType='disc'>
            <li>Name</li>
            <li>Contact information (email address, phone number)</li>
            <li>Billing and payment details</li>
            <li>Account credentials</li>
            <li>User preferences</li>
            <li>Usage data</li>
          </ul>
          <p>Non-Personal Information</p>
          <p>We may also collect non-personal information, such as:</p>
          <ul itemType='disc'>
            <li>
              Device information (browser type, IP address, operating system)
            </li>
            <li>Usage data (pages visited, time spent on the site)</li>
            <li>Cookies and similar technologies</li>
          </ul>

          <h6>How We Collect Information</h6>
          <p>We collect information through various channels, including:</p>
          <ul itemType='disc'>
            <li>
              Directly from you when you create an account, make a purchase, or
              interact with our services.
            </li>
            <li>
              Automatically through cookies and similar technologies as you
              navigate our website.
            </li>
            <li>
              From third-party sources for authentication and fraud prevention
              purposes.
            </li>
          </ul>

          <h6>Use of Information</h6>
          <p>We use your information for the following purposes:</p>
          <ul itemType='disc'>
            <li>
              To provide, enhance, and personalize our products and services.
            </li>
            <li>To process transactions and deliver requested services.</li>
            <li>
              To communicate with you, respond to inquiries, and provide
              updates.
            </li>
            <li>For marketing and promotional purposes, with your consent.</li>
            <li>To improve our website and user experience.</li>
            <li>To prevent fraud and ensure the security of our systems.</li>
          </ul>

          <h6>Sharing of Information</h6>
          <p>We may share your information with:</p>
          <ul itemType='disc'>
            <li>
              Service providers and partners involved in delivering our products
              and services.
            </li>
            <li>
              Law enforcement or regulatory authorities when required by law.
            </li>
            <li>In the context of a merger, acquisition, or sale of assets.</li>
          </ul>

          <h6>Your Choices</h6>
          <p>You have the right to:</p>
          <ul itemType='disc'>
            <li>Access, correct, or delete your personal information.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Adjust cookie settings through your browser.</li>
          </ul>

          <h6>Security</h6>
          <p>
            YWe implement reasonable security measures to protect your
            information. However, no method of transmission over the internet or
            electronic storage is entirely secure.
          </p>
          <h6>Children's Privacy</h6>
          <p>
            Our services are not intended for individuals under the age of 13.
            We do not knowingly collect personal information from children.
          </p>
          <h6>Contact Us</h6>
          <p>
            If you have questions or concerns about this Privacy Policy, please
            contact us at [privacy@saasmartsolutions.com].
          </p>
        </p>
      </div>
      <Footer />
    </div>
  );
}
