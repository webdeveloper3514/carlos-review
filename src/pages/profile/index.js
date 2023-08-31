import {Button, notification} from "antd";
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { LOGIN_USER, LOGOUT_USER } from "../../reducers/types";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Auth } from "../../firebase/config";

const Profile = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [displayName, setdisplayName] = useState("");

    const logoutUser = () => {
        signOut(Auth)
        .then(() => {
            dispatch({type: LOGOUT_USER})
            notification.success({description: "Cerrar sesión exitosamente.",});
        })
        .catch((error) => {
            notification.error({description: error.message});
        });
    };

    // Monitor currently sign in user
    // useEffect(() => {
    //     onAuthStateChanged(Auth, (user) => {
    //         if (user) {
            // console.log(user);
    //         if (user.displayName == null) {
    //             const u1 = user.email.slice(0, -10);
    //             const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
    //             setdisplayName(uName);
    //         } else {
    //             setdisplayName(user.displayName);
    //         }
    //         dispatch({
    //             type: LOGIN_USER,
    //             payload: {
    //             token: user?.accessToken,
    //             name: user.displayName ? user?.displayName?.split(" ")[0] : displayName ,
    //             lastName: user?.displayName?.split(" ")[1],
    //             email: user?.email,
    //             userName: user?.displayName,
    //             },
    //         });
    //         } else {
    //             setdisplayName("");
    //             dispatch({type: LOGOUT_USER});
    //         }
    //     });
    // }, [dispatch, displayName]);

    return (
        <div>
            <Button onClick={() => logoutUser()} style={{margin: '10px', float:'right'}}>
                Log Out
            </Button>
            <div className="de" style={{padding: '20px'}}>
                <div>Name :{auth?.name} {auth?.lastName}</div>
                <div>Email :{auth?.email}</div>
            </div>
        </div>
    );
};

export default Profile;
