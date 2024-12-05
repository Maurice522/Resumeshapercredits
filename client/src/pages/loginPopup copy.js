import React, { useState } from 'react';
import { auth, getUserFromDatabase } from '../fireabse';
import { loginUser, updateUser } from '../redux/slices/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addUserInDatabase } from '../fireabse';
import img3 from '../images/28.png'
import '../styleSheet/LoginPopup.css';
import { limitToLast } from 'firebase/firestore';

const LoginPopup1 = ({ onClose, onSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorr, setErrorr] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const mapFirebaseErrorToMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/user-not-found':
                return 'User not found. Please check your email or sign up.';
            case 'auth/invalid-email':
                return 'Invalid email address. Please enter a valid email.';
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/invalid-login-credentials':
                return 'Invalid Login Credentials'
            default:
                errorCode = errorCode.substring(5);
                errorCode = errorCode.charAt(0).toUpperCase() + errorCode.slice(1);
                return (errorCode);
        }
    };


    const handleToggleMode = () => {
        setIsLogin(!isLogin);
        setErrorr(null);
    };

    const signInUser = (auth, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = await getUserFromDatabase(email)
                dispatch(updateUser(user))
                navigate("/auth")
                console.log(userCredential);
            }).catch(err => {
                console.log(err);
                const userFriendlyErrorMessage = mapFirebaseErrorToMessage(err.code);
                setErrorr(userFriendlyErrorMessage);
            })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (isLogin) {
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = await getUserFromDatabase(email)
                    dispatch(updateUser(user))
                    navigate("/auth")
                    console.log(userCredential);
                    onClose();
                }).catch(err => {
                    console.log(err);
                    const userFriendlyErrorMessage = mapFirebaseErrorToMessage(err.code);
                    setErrorr(userFriendlyErrorMessage);
                })
        } else {
            var founduser = getUserFromDatabase(email)
            if(founduser===undefined){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    addUserInDatabase({ email, password, name })
                    signInUser(auth, email, password)
                    dispatch(loginUser({ email, password, name }))
                    console.log(userCredential);
                    onClose();
                }).catch(err => {
                    console.log(err);
                    const userFriendlyErrorMessage = mapFirebaseErrorToMessage(err.code);
                    setErrorr(userFriendlyErrorMessage);
                })
            }
            
        }

    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2 className='loginHeader'>
                    <img src={img3} className='popupImg' />
                    <span className="close" onClick={onClose}>&times;</span>
                    {isLogin ? 'Login' : 'Sign Up'}</h2>
                <form onSubmit={submitHandler} className="loginForm">
                    <div className="form-group">
                        <label className='loginLabel'>Email:</label>
                        <input
                            type='email'
                            className='loginInput'

                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    {!isLogin && (
                        <div className="form-group">
                            <label className='loginLabel'>Name:</label>
                            <input
                                className='loginInput'
                                type='name'
                                placeholder='Enter your name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label className='loginLabel'>Password:</label>
                        <input
                            className='loginInput'
                            type='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)
                            }
                        />
                    </div>
                    {errorr && <p className="errorMsg">{errorr}</p>}
                    <div className="form-actions">
                        <button type="submit" className='loginNow'>{isLogin ? 'Login' : 'Sign Up'}</button>
                        <button type="button" class='selectLoginBtn' onClick={handleToggleMode}>
                            {isLogin ? 'Dont have an account? Sign Up' : 'Have an Account? Login'}
                        </button>
                    </div>
                </form>
            </div>
           
        </div>
    );
};

export default LoginPopup1