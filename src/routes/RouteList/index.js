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

    // Login with Gooogle
    const GProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setGLoading(true);
        signInWithPopup(Auth, GProvider)
        .then((result) => {
            notification.success({description: "Inicio de sesión correcto..."});
            dispatch(loginUser(result));
            navigate(PATH_LIST.user.profile);
            setGLoading(false);
        }).catch((error) => {
            setGLoading(false);
            notification.error({description: error.message});
        });
    };

    //login using Facebook
    const fbProvider = new FacebookAuthProvider();
    const signInWithFacebook = () => {
        setFbLoading(true);
        signInWithPopup(Auth, fbProvider)
        .then((result) => {
            notification.success({description: "Inicio de sesión correcto..."});
            dispatch(dispatch(loginUser(result)));
            navigate(PATH_LIST.user.profile);
            setFbLoading(false);
        }).catch((error) => {
            setFbLoading(false);
            notification.error({description: error.message});
        });
    };

    return (
        <Routes>
            <Route path={PATH_LIST.user.common} element={<Login signInWithGoogle={signInWithGoogle} gLoading={gLoading} signInWithFacebook={signInWithFacebook} fbLoading={fbLoading} /> } />
            <Route path={PATH_LIST.user.login} element={<Login signInWithGoogle={signInWithGoogle}  gLoading={gLoading} signInWithFacebook={signInWithFacebook} fbLoading={fbLoading} /> } />
            <Route  exact path={PATH_LIST.user.register} element={<Register signInWithGoogle={signInWithGoogle} gLoading={gLoading}signInWithFacebook={signInWithFacebook}  fbLoading={fbLoading} /> } />
            <Route  exact path={PATH_LIST.user.verifyEmail} element={<VerifyEmail /> } />
            <Route exact path={PATH_LIST.user.forgotPassword} element={<ForgotPassword />} />
            <Route exact path={PATH_LIST.user.profile} element={
                auth?.token ? (
                    <Profile />
                ) : (
                    <Navigate replace to={PATH_LIST.user.login} />
                )
            }
            />
        </Routes>
    );
};

export default RouteList;
