import { Button, Form, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import "../style.scss";
import TermsConditionModal from "../../../Components/Modal/TermsConditionModal";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { GoogleOutlined, FacebookFilled } from "@ant-design/icons";
import { AuthLeft, emptyField, inValidEmail } from "../../../config/common";
import { Auth } from "../../../firebase/config";
import { PATH_LIST } from "../../../config";

const Register = ({ signInWithGoogle, gLoading, signInWithFacebook, fbLoading }) => {
    const navigate = useNavigate()
    //signup form state
    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
    });

    // signup error handle
    const [formErrors, setFormErrors] = useState({});

    //password validation
    const [passValidate, setPassValidate] = useState({
        lengthValid: false,
        numberValid: false,
        lowercaseValid: false,
        specialCharValid: false,
        uppercaseValid: false,
    });

    //modal state
    const [termModal, setTermModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //handle form input change
    const handleFormChange = (e, name) => {
        let changedField = { ...formData };
        const value = e.target.value;
        changedField[name] = value;
        setFormData({ ...changedField });
        let changeError = { ...formErrors };
        delete changeError[name];
        setFormErrors({ ...changeError });

        if (name === "email") {
            if (value !== "") {
                changeError[name] = inValidEmail(value)
                    ? "¡El ID de correo electrónico no es válido!"
                    : "";
            } else {
                delete changeError[name];
            }
            setFormErrors({ ...changeError });
        } else if (name === "password") {
            setPassValidate({
                lengthValid: value.length >= 8,
                numberValid: /\d/.test(value),
                lowercaseValid: /[a-z]/.test(value),
                specialCharValid: /[./$&*#!]/.test(value),
                uppercaseValid: /[A-Z]/.test(value),
            });
            handleValidPassword(e, name, value, changeError);
        }
    };

    const handleValidPassword = (e, name, value, changeError) => {
        const isFormValid = Object.values(passValidate).every((value) => value);

        if (value !== "" && !isFormValid) {
            changeError[name] = "¡La contraseña no es válida!";
        } else {
            delete changeError[name];
        }
        setFormErrors({ ...changeError });
    };

    //handle input blur function
    const handleInputBlur = (name, title, mandatory = true) => {
        let changeError = { ...formErrors };
        if (mandatory) {
            if (formData[name] === "") {
                changeError[name] = name === "email" ? title : `¡Se requiere ${title}`;
            } else {
                if (name === "password") {
                    const isFormValid = Object.values(passValidate).every((value) => value);
                    changeError[name] = isFormValid ? "" : "¡La contraseña no es válida!";
                } else {
                    changeError[name] = "";
                }
            }
        }
        setFormErrors({ ...changeError });
    };

    const dispatchAction = async () => {
        let errors = {};
        if (emptyField(formData.name)) {
            errors.name = "¡Se requiere el nombre!";
        }
        if (emptyField(formData.lastName)) {
            errors.lastName = "¡Se requiere apellido!";
        }
        if (emptyField(formData.email)) {
            errors.email = "¡correo electronico es requerido!";
        }
        if (emptyField(formData.userName)) {
            errors.userName = "¡Se requiere nombre de usuario!";
        }
        if (emptyField(formData.password)) {
            errors.password = "¡Se requiere contraseña!";
        }

        setFormErrors({ ...errors });
        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    Auth,
                    formData.email,
                    formData.password
                );
                setIsLoading(false);
                notification.success({ description: "Registro exitoso. Enviando correo electrónico de verificación...", });
                sendEmailVerify(userCredential);
            } catch (error) {
                setIsLoading(false);
                notification.error({ description: error.message });
            }
        }
    };

    const sendEmailVerify = (userCredential) => {
        sendEmailVerification(userCredential.user)
        notification.success({ description: "El mensaje de verificación ha sido enviado. Por favor revisa tu bandeja de entrada y sigue las instrucciones." });
        navigate(PATH_LIST.USER.VERIFY_EMAIL)

    }

    return (
        <>
            <div className="auth-section register-page">
                <AuthLeft />
                <div className="auth-right">
                    <div className='fixed-width'>
                        <div className="header">
                            <h1>¡Bienvenido a Saikit!</h1>
                            <div className="already-user">
                                <p>¿Ya tienes una cuenta? <Link to={PATH_LIST.USER.LOGIN}>Inicia sesión</Link></p>
                            </div>
                        </div>
                    </div>
                    <div className="form">
                        <RegistrationForm
                            data={formData}
                            error={formErrors}
                            handleChange={handleFormChange}
                            passValidate={passValidate}
                            handleBlur={handleInputBlur}
                        />
                        <div className="action-field">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => dispatchAction()}
                                    loading={isLoading}
                                >
                                    Regístrate
                                </Button>
                            </Form.Item>
                        </div>
                        <div className="term-condition">
                            <span>
                                Al dar click en “Registrarme” estás aceptando nuestra políticade
                                <span className="info" onClick={() => setTermModal(true)}>
                                    términos y condiciones
                                </span>
                            </span>
                        </div>
                        <div className="another-login-option">
                            <span>O ingresa rápido con tus cuentas</span>
                            <div className="another-options">
                                <div className="facebook">
                                    <Button
                                        className=""
                                        onClick={()=> signInWithFacebook()}
                                        loading={fbLoading}
                                    >
                                        <FacebookFilled /> Ingresar con Facebook
                                    </Button>
                                </div>
                                <div className="google">
                                    <Button
                                        className=""
                                        onClick={()=> signInWithGoogle()}
                                        loading={gLoading}
                                    >
                                        <GoogleOutlined /> Ingresar con Gmail
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {termModal && (
                <TermsConditionModal
                    closeModal={termModal}
                    setCloseModal={setTermModal}
                />
            )}
        </>
    );
};

export default Register;
