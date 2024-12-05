import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Authdetails } from "./pages/authdetails";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import CreateLive from "./pages/createLiveNew";
import Test from "./pages/test";
import CreateLiveContinue from "./pages/createLive";
import AboutUs from "./pages/aboutUs";
import Terms from "./pages/termsOfService";
import PrivacyPolicy from "./pages/privacyPolicy";
import Upgrade from "./pages/Upgrade";
import PaymentMentorMeetingSchedule from "./components/payment/PaymentMentorMeetingSchedule"
import SuccessfulPaymentPage from "./pages/paymentSuccess";
import PaymentFailedPage from "./pages/paymentFailed";
import Paypal from "./components/payment/Paypal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/create",
    element: <CreateLive />,
  },
  {
    path: "/createcontinue/:idx",
    element: <CreateLiveContinue />,
  },
  {
    path: "/auth",
    element: <Authdetails />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
  },
  {
    path: "/termsandconditions",
    element: <Terms />,
  },
  {
    path: "/privacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/upgrade",
    element: <Upgrade />,
  },
  {
    path: "/payment",
    element: <PaymentMentorMeetingSchedule />,
  },
  {
    path: "/paymentsuccess",
    element: <SuccessfulPaymentPage />,
  },
  {
    path: "/paymentfailed",
    element: <PaymentFailedPage />,
  },
  {
    path:"/paypal",
    element: <Paypal/>
  }
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;