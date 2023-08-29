import React, { useEffect, useState } from "react";
import artwork from "../../../assets/images/artwork.svg";
import "../style.scss";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { Button, Form, notification } from "antd";
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { CONSTANT_ROUTES } from "../../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../../firebase/config";
import { emptyField, inValidEmail } from "../../../config/common";
import { LOGIN_USER } from "../../../reducers/types";

const Login = ({ signInWithGoogle, gLoading, signInWithFacebook, fbLoading }) => {
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({});

    //handle form input change
    const handleFormChange = (e, name) => {
        let changedField = { ...formData };
        const value = e.target.value;
        changedField[name] = value;
        setFormData({ ...changedField });
        let changeError = { ...formErrors };
        delete changeError[name];

        if (name === "email") {
            if (value !== "" && inValidEmail(value)) {
                changeError[name] = "¡El ID de correo electrónico no es válido!"
            } else {
                delete changeError[name];
            }
        }
        setFormErrors({ ...changeError });
    };

    //handle input blur function
    const handleInputBlur = (name, title, mandatory = true) => {
        let changeError = { ...formErrors };
        if (mandatory) {
            if (formData[name] === "") {
                changeError[name] = `¡Se requiere ${title}`;
            } else {
                changeError[name] = ''
            }
        }
        setFormErrors({ ...changeError });
    };

    const dispatchAction = (action) => {
        let payload = {
            email: formData.email,
            password: formData.password,
        };
        let errors = {};
        if (emptyField(formData.email)) {
            errors.email = "¡correo electronico es requerido!";
        }
        if (emptyField(formData.password)) {
            errors.password = "¡Se requiere contraseña!";
        }

        setFormErrors({ ...errors });
        switch (action) {
            case "login":
                if (Object.keys(errors).length === 0) {
                    setIsLoading(true);
                    signInWithEmailAndPassword(
                        Auth,
                        formData.email,
                        formData.password
                    )
                        .then((result) => {
                            notification.success({ description: "Inicio de sesión correcto...", });
                            dispatch({
                                type: LOGIN_USER,
                                payload: {
                                    token: result?.user?.accessToken,
                                    name: result?.user?.displayName?.split(" ")[0],
                                    lastName: result?.user?.displayName?.navigatesplit(" ")[1],
                                    email: result?.user?.email,
                                    userName: result?.user?.displayName,
                                },
                            });
                            setIsLoading(false);
                        })
                        .catch((error) => {
                            setIsLoading(false);
                            notification.error({ description: error.message });
                        });
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (auth.token) {
            navigate(CONSTANT_ROUTES.user.profile);
        }
    }, [auth]);

    return (
        <div className="auth-section login-page">
            <div className="auth-left">
                <img src={artwork} alt="artwork" />
            </div>

            <div className="auth-right">
                <div className="header">
                    <h1>¡Hola de nuevo!</h1>
                    <div className="already-user">
                        <p>¿Aún no tienes una cuenta? <Link to="/register">Regístrate</Link></p>
                    </div>
                </div>
                <div className="form">
                    <LoginForm data={formData} error={formErrors} handleChange={handleFormChange} handleBlur={handleInputBlur} />

                    <div className="action-field">
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                onClick={() => dispatchAction("login")}
                                loading={isLoading}
                            >
                                Ingresar
                            </Button>
                        </Form.Item>
                    </div>
                </div>

                <div className="another-login-option">
                    <span>O ingresa rápido con tus cuentas</span>
                    <div className="another-options">
                        <div className="facebook">
                            <Button className="" onClick={signInWithFacebook} loading={fbLoading}>
                                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.21875 9H5.875V16H2.75V9H0.1875V6.125H2.75V3.90625C2.75 1.40625 4.25 0 6.53125 0C7.625 0 8.78125 0.21875 8.78125 0.21875V2.6875H7.5C6.25 2.6875 5.875 3.4375 5.875 4.25V6.125H8.65625L8.21875 9Z" fill="#5C30A1" />
                                </svg>
                                Ingresar con Facebook
                            </Button>
                        </div>
                        <div className="google">
                            <Button className="" onClick={signInWithGoogle} loading={gLoading}>
                                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.125 8.1875C16.125 12.625 13.0938 15.75 8.625 15.75C4.3125 15.75 0.875 12.3125 0.875 8C0.875 3.71875 4.3125 0.25 8.625 0.25C10.6875 0.25 12.4688 1.03125 13.8125 2.28125L11.6875 4.3125C8.9375 1.65625 3.8125 3.65625 3.8125 8C3.8125 10.7188 5.96875 12.9062 8.625 12.9062C11.6875 12.9062 12.8438 10.7188 13 9.5625H8.625V6.90625H16C16.0625 7.3125 16.125 7.6875 16.125 8.1875Z" fill="#5C30A1" />
                                </svg>
                                Ingresar con Gmail
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
