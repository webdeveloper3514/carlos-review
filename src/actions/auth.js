import { LOGIN_USER } from "../reducers/types";


export const loginUser = (result) => async (dispatch) => {
    dispatch({
        type: LOGIN_USER,
        payload: {
            token: result?.user?.accessToken,
            name: result?.user?.displayName?.split(" ")[0],
            lastName: result?.user?.displayName?.split(" ")[1],
            email: result?.user?.email,
            userName: result?.user?.displayName,
        },
    });

} 