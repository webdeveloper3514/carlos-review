import React, {useEffect, useState} from "react";
import artwork from "../../../assets/images/artwork.svg";
import "../style.scss";
import {Link, useNavigate} from "react-router-dom";
import LoginForm from "./LoginForm";
import {Button, Form, notification} from "antd";
import {FacebookFilled, GoogleOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {CONSTANT_ROUTES} from "../../../config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../../../firebase/config";
import { emptyField, inValidEmail } from "../../../config/common";
import { LOGIN_USER } from "../../../reducers/types";

const Login = ({signInWithGoogle, gLoading, signInWithFacebook, fbLoading}) => {
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
        let changedField = {...formData};
        const value = e.target.value;
        changedField[name] = value;
        setFormData({...changedField});
        let changeError = {...formErrors};
        delete changeError[name];

        if (name === "email") {
            if (value !== "" && inValidEmail(value)) {
                changeError[name] = "¡El ID de correo electrónico no es válido!"
            } else {
              delete changeError[name];
            }
        } 
        setFormErrors({...changeError});
    };  

    //handle input blur function
    const handleInputBlur = (name, title, mandatory = true) => {
        console.log(".....")
        let changeError = { ...formErrors };
        if (name === "email") {
            if (formData[name] !== "") {
                changeError[name] = "¡El ID de correo electrónico no es válido!"
            } else {
            delete changeError[name];
            }
        } else if(mandatory) {
            if (formData[name] === "") {
                changeError[name] = `¡Se requiere ${title}`;
            }else{
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

        setFormErrors({...errors});
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
                notification.success({description: "Inicio de sesión correcto...",});
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
                notification.error({description: error.message});
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
                <h1>¡Bienvenido a Saikit!</h1>
                <div className="already-user">
                    <p>¿Aún no tienes una cuenta? </p> <Link to="/register">Regístrate</Link>
                </div>
            </div>
            <div className="form">
                <LoginForm data={formData} error={formErrors} handleChange={handleFormChange} handleBlur={handleInputBlur}/>

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
                <div className="another-login-option">
                    <span>O ingresa rápido con tus cuentas</span>
                    <div className="another-options">
                        <div className="facebook">
                            <Button className="" onClick={signInWithFacebook} loading={fbLoading}>
                                <FacebookFilled />Ingresar con Facebook
                            </Button>
                        </div>
                        <div className="google">
                            <Button className="" onClick={signInWithGoogle} loading={gLoading}>
                                <GoogleOutlined />Ingresar con Gmail
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
  );
};

export default Login;
