import {Button, notification} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { LOGOUT_USER } from "../../reducers/types";
import { signOut } from "firebase/auth";
import { Auth } from "../../firebase/config";

const Profile = () => {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

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

    return (
        <div>
            <Button onClick={() => logoutUser()} style={{margin: '10px', float:'right'}}>
                Log Out
            </Button>
            <div className="de" style={{padding: '20px'}}>
                <div>Name :{auth?.name} {auth?.lastName}</div>
                <div>Email :{auth?.email}</div>
                <div>Verified Email :{auth?.emailVerified ? 'true' : 'false'}</div>
            </div>
        </div>
    );
};

export default Profile;
