import { useEffect, useState } from "react";
import "./App.css";
import Routes from "./Routes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./fireabse";
import { getUserFromDatabase } from "./fireabse";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/slices/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const tempuser = await getUserFromDatabase(user.email);
        dispatch(loginUser(tempuser));
      } else {
        setAuthUser(null);
      }
    });
  }, []);
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
