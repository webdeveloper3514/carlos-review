import React, {useState} from "react";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {CONSTANT_ROUTES} from "../../config";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import {FacebookAuthProvider, GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import {notification} from "antd";
import {Auth} from "../../firebase/config";
import Profile from "../../pages/profile";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_USER} from "../../reducers/types";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import VerifyEmail from "../../pages/auth/Register/VerifyEmail";

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
            dispatch({
                type: LOGIN_USER,
                payload: {
                    token: result.user.accessToken,
                    name: result.user.displayName.split(" ")[0],
                    lastName: result.user.displayName.split(" ")[1],
                    email: result.user.email,
                    userName: result.user.displayName,
                },
            });
            navigate(CONSTANT_ROUTES.user.profile);
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
            dispatch({
                type: LOGIN_USER,
                payload: {
                    token: result.user.accessToken,
                    name: result.user.displayName.split(" ")[0],
                    lastName: result.user.displayName.split(" ")[1],
                    email: result.user.email,
                    userName: result.user.displayName,
                },
            });
            navigate(CONSTANT_ROUTES.user.profile);
            setFbLoading(false);
        }).catch((error) => {
            setFbLoading(false);
            notification.error({description: error.message});
        });
    };

    return (
        <Routes>
            <Route path={CONSTANT_ROUTES.user.common} element={<Login signInWithGoogle={signInWithGoogle} gLoading={gLoading} signInWithFacebook={signInWithFacebook} fbLoading={fbLoading} /> } />
            <Route path={CONSTANT_ROUTES.user.login} element={<Login signInWithGoogle={signInWithGoogle}  gLoading={gLoading} signInWithFacebook={signInWithFacebook} fbLoading={fbLoading} /> } />
            <Route  exact path={CONSTANT_ROUTES.user.register} element={<Register signInWithGoogle={signInWithGoogle} gLoading={gLoading}signInWithFacebook={signInWithFacebook}  fbLoading={fbLoading} /> } />
            <Route  exact path={CONSTANT_ROUTES.user.verifyEmail} element={<VerifyEmail /> } />
            <Route exact path={CONSTANT_ROUTES.user.forgotPassword} element={<ForgotPassword />} />
            <Route exact path={CONSTANT_ROUTES.user.profile} element={
                auth?.token ? (
                    <Profile />
                ) : (
                    <Navigate replace to={CONSTANT_ROUTES.user.login} />
                )
            }
            />
        </Routes>
    );
};

export default RouteList;
