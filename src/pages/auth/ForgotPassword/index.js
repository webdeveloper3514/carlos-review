import React, { useState } from 'react'
import artwork from '../../../assets/images/artwork.svg'
import tableartwork from '../../../assets/images/tableartwork.svg'
import mobileartwork from '../../../assets/images/mobileartwork.svg'
import { Link } from 'react-router-dom'
import { Button, Form, Input, notification } from 'antd'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Auth } from '../../../firebase/config'
import { LeftOutlined } from '@ant-design/icons'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSend, setIsEmailSend] = useState(false)

    const emailValidation = (value) => {
        const emailRegex = /^\w+([\.\+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value === "") {
            setEmailErr("Â¡Correo electronico es requerido!");
            setEmail(value);
        } else if (!emailRegex.test(value)) {
            setEmailErr("Â¡La direcciÃ³n de correo electrÃ³nico no es vÃ¡lida!");
            setEmail(value);
        } else {
            setEmailErr("");
            setEmail(value);
        }
    };

    const handleSendEmail = () => {
        emailValidation(email)
        if (emailErr === "") {
            setIsLoading(true);
            sendPasswordResetEmail(Auth, email)
                .then(() => {
                    setIsEmailSend(true)
                    setIsLoading(false);
                    notification.success({ description: "¡Revise su correo electrónico para obtener un enlace de reinicio!" });
                })
                .catch((error) => {
                    setIsLoading(false);
                    notification.error({ description: error.message });
                });

        }
    }

    return (
        <div className="auth-section forgot-password-page">
            <div className="auth-left">
                <img className='desktop-arc' src={artwork} alt="artwork" />
                <img className='table-arc' src={tableartwork} alt="tabletartwork" />
                <img className='mobile-arc' src={mobileartwork} alt="mobileartwork" />
            </div>
            <div className="auth-right">
                <div className='fixed-width'>
                    <div className="back">
                        <Link to="/login">
                            <span className='icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M12 16.1924L5.9038 10.0962L12 4" stroke="#5A5A5A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            Regresar
                        </Link>
                    </div>

                    <div className="header">
                        {
                            !isEmailSend ?
                                <h1>¿Olvidaste tu contraseña?</h1>
                                :
                                <h1>Revisa tu correo</h1>
                        }
                    </div>
                    <div className="message">
                        {
                            !isEmailSend ?
                                <p>Ingresa el correo asociado a tu cuenta y enviaremos instrucciones para restablecer tu contraseña.</p>
                                :
                                <p>Hemos enviado instrucciones para restablecer tu contraseña al correo indicado.</p>
                        }
                    </div>
                </div>
                <div className="form">
                    <Form className="auth-form" layout="vertical" name="register-form">
                        <div className="field">
                            {
                                !isEmailSend ?
                                    <Form.Item
                                        label="Correo electrónico"
                                        validateStatus={emailErr ? "error" : ""}
                                        help={emailErr || ""}
                                    >
                                        <Input
                                            type="email"
                                            placeholder="tunombre@email.com"
                                            value={email}
                                            onChange={(e) => emailValidation(e.target.value)}
                                            autoCapitalize='on'
                                        />
                                    </Form.Item>
                                    :
                                    <p>¿No recibiste el correo? Revisa tu bandeja de Spam o solicita que enviemos el mensaje de nuevo.</p>
                            }
                        </div>
                        <div className="action-field">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={() => handleSendEmail()}
                                    loading={isLoading}
                                >
                                    {
                                        !isEmailSend ?
                                            'Enviar instrucciones'
                                            :
                                            'Enviar de nuevo'
                                    }
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword