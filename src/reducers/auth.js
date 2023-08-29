import { LOGIN_USER, LOGOUT_USER } from "./types";

const initialState = {
    token: localStorage.getItem("token") || '',
    name: localStorage.getItem("name") || [],
    lastName: localStorage.getItem("lastName") || '',
    email: localStorage.getItem("email") || '',
    userName: localStorage.getItem("userName") || '',
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("name", action.payload.name);
            localStorage.setItem("lastName", action.payload.lastName);
            localStorage.setItem("email", action.payload.email);
            localStorage.setItem("userName", action.payload.userName);
            return{
                token: action.payload.token,
                name : action.payload.name,
                lastName : action.payload.lastName,
                email : action.payload.email,
                userName : action.payload.userName
            }
        case LOGOUT_USER :
            localStorage.clear();
            return{
                token: null,
                name : null,
                lastName : null,
                email : null,
                userName : null
            }
        default:
            return state;
    }
}

export default auth;