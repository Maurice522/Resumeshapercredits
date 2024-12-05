import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../fireabse";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../redux/slices/user";
import UploadPDF from "../components/uploadpdf";
import Home from "./home";
import { useNavigate } from "react-router-dom";

export const Authdetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setLoading(false);
      } else {
        setAuthUser(null);
        navigate("/");
        setLoading(false);
      }
    });
  }, []);
  // accessToken
  // :
  // "eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVzdW1lY3JlYXRvci0zZDhmZCIsImF1ZCI6InJlc3VtZWNyZWF0b3ItM2Q4ZmQiLCJhdXRoX3RpbWUiOjE2OTYzMzk0NTQsInVzZXJfaWQiOiJpQWFpZjRCR3NmYmFZMmVyemd5U3gxNHk5czUzIiwic3ViIjoiaUFhaWY0QkdzZmJhWTJlcnpneVN4MTR5OXM1MyIsImlhdCI6MTY5NjMzOTQ1NCwiZXhwIjoxNjk2MzQzMDU0LCJlbWFpbCI6Im1hdXJpY2VyYW5hQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtYXVyaWNlcmFuYUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Cj0TpnZkpfel-09KSys74dHZU3BBV2PSyTzgTk5mag3aDebph9WlxONLfBbK4yjRp76HePHug8sChsduHVdm25mqw3j3E8XEhFCbnnfseXBgDk5PwQan_5778UPG4GWBmLuOCoOXDpSXhNCpjd9QNgtaNr8ISFG7jCeHHjsBY2XIWTemMARrEVde_ZhR-9MWkw3xmfmgD4Db68PdogzP61JxwiJrfx8AYqfl5DhAhWa1fte1oFNnSYsReknTQ20GprVT3WfVb3HsMZLNw_mLaBEH5xGGf66VdVIZHYAO_kVkAq8qKiKsKBby8__YV69f4gcmy8aATaLwr7K14VCFZQ"
  // auth
  // :
  // AuthImpl {app: FirebaseAppImpl, heartbeatServiceProvider: Provider, appCheckServiceProvider: Provider, config: {…}, currentUser: null, …}
  // displayName
  // :
  // null
  // email
  // :
  // "mauricerana@gmail.com"
  // emailVerified
  // :
  // false
  // isAnonymous
  // :
  // false
  // metadata
  // :
  // UserMetadata {createdAt: '1696338409881', lastLoginAt: '1696339454067', lastSignInTime: 'Tue, 03 Oct 2023 13:24:14 GMT', creationTime: 'Tue, 03 Oct 2023 13:06:49 GMT'}
  // phoneNumber
  // :
  // null
  // photoURL
  // :
  // null
  // proactiveRefresh
  // :
  // ProactiveRefresh {user: UserImpl, isRunning: false, timerId: null, errorBackoff: 30000}
  // providerData
  // :
  // [{…}]
  // providerId
  // :
  // "firebase"
  // reloadListener
  // :
  // null
  // reloadUserInfo
  // :
  // {localId: 'iAaif4BGsfbaY2erzgySx14y9s53', email: 'mauricerana@gmail.com', passwordHash: 'UkVEQUNURUQ=', emailVerified: false, passwordUpdatedAt: 1696338409881, …}
  // stsTokenManager
  // :
  // StsTokenManager {refreshToken: 'AMf-vBytfMfTvwMxtL8xhhipewdLmi3BEWe7PdvB7ypgo17X3B…0Eyz6WpiDDfio25syPx0j-3VULzZAMMR16fD38eorRcV_vUGE', accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZT…YAO_kVkAq8qKiKsKBby8__YV69f4gcmy8aATaLwr7K14VCFZQ', expirationTime: 1696343052909}
  // tenantId
  // :
  // null
  // uid
  // :
  // "iAaif4BGsfbaY2erzgySx14y9s53"
  // refreshToken
  // :
  // "AMf-vBytfMfTvwMxtL8xhhipewdLmi3BEWe7PdvB7ypgo17X3BjUkQ7mYhz2fXKpzWrIutrVp2rpQmv2kPvtLf96FBJJ9Y5XhF24_-CsYbH5d_nMbjzUNKyrFup9Qy29zKYNI069-JqwV69i_JcHENwiKxzLxiNEwM6mGKxrZE_8QFrJzuL0y05KrzTEKaSFXsF-Rc0Eyz6WpiDDfio25syPx0j-3VULzZAMMR16fD38eorRcV_vUGE"

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {authUser ? (
            <>
              <Home />
            </>
          ) : (
            "Signup!"
          )}
        </div>
      )}
    </>
  );
};
