import React, {useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {PATH_LIST} from "../../config";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import {FacebookAuthProvider, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import {notification} from "antd";
import {Auth} from "../../firebase/config";
import Profile from "../../pages/profile";
import {useDispatch, useSelector} from "react-redux";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import VerifyEmail from "../../pages/auth/Register/VerifyEmail";
import { loginUser } from "../../actions/auth";

const RouteList = () => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [gLoading, setGLoading] = useState(false);
    const [fbLoading, setFbLoading] = useState(false);

    // Login with Google
	const GProvider = new GoogleAuthProvider();
	const signInWithGoogle = async () => {
		setGLoading(true);
		try {
			const result = await signInWithPopup(Auth, GProvider);
			notification.success({description: "Inicio de sesión correcto..."});
			dispatch(loginUser(result));
			navigate(PATH_LIST.USER.PROFILE);
		} catch (error) {
			notification.error({description: error.message});
		} finally {
			setGLoading(false);
		}
	};

	// Login using Facebook
	const fbProvider = new FacebookAuthProvider();
	const signInWithFacebook = async () => {
		setFbLoading(true);
		try {
			const result = await signInWithPopup(Auth, fbProvider);
			notification.success({description: "Inicio de sesión correcto..."});
			dispatch(loginUser(result));
			navigate(PATH_LIST.USER.PROFILE);
		} catch (error) {
			notification.error({description: error.message});
		} finally {
			setFbLoading(false);
		}
	};

    return (
        <Routes>
            <Route path={PATH_LIST.USER.COMMON} element={<Login signInWithGoogle={signInWithGoogle} gLoading={gLoading} signInWithFacebook={signInWithFacebook} fbLoading={fbLoading} /> } />
            <Route path={PATH_LIST.USER.LOGIN} element={<Login signInWithGoogle={signInWithGoogle}  gLoading={gLoading} signInWithFacebook={signInWithFacebook} fbLoading={fbLoading} /> } />
            <Route  exact path={PATH_LIST.USER.REGISTER} element={<Register signInWithGoogle={signInWithGoogle} gLoading={gLoading}signInWithFacebook={signInWithFacebook}  fbLoading={fbLoading} /> } />
            <Route  exact path={PATH_LIST.USER.VERIFY_EMAIL} element={<VerifyEmail /> } />
            <Route exact path={PATH_LIST.USER.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route exact path={PATH_LIST.USER.PROFILE} element={
                auth?.token ? (
                    <Profile />
                ) : (
                    <Navigate replace to={PATH_LIST.USER.L} />
                )
            }
            />
        </Routes>
    );
};

export default RouteList;
