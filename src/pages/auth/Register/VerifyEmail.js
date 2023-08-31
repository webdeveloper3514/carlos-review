import { sendEmailVerification } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Auth } from '../../../firebase/config';
import artwork from '../../../assets/images/artwork.svg'
import { LeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { CONSTANT_ROUTES } from '../../../config';
import { Button, Form } from 'antd';

const VerifyEmail = () => {
    const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        let interval;
        if (countdown > 0 && isResendDisabled) {
            interval = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
            }, 1000);
        } else {
            setIsResendDisabled(false);
        }

        return () => clearInterval(interval);
    }, [countdown, isResendDisabled]);

    const handleResendEmail = async () => {
        setIsResendDisabled(true);
        try {
            await sendEmailVerification(Auth.currentUser);
            setCountdown(600);
        } catch (error) {
        }
    };

    return (
        <div className="auth-section verify-email-page">
            <div className="auth-left">
                <img src={artwork} alt="artwork" />
            </div>
            <div className="auth-right">
                {
                    !Auth.currentUser ?
                        !Auth?.currentUser?.emailVerified ?
                            <div className='fixed-width'>
                                <div className='header'>
                                    <h1>
                                        Tu correo ha sido verificado
                                    </h1>
                                </div>
                                <h4>¡Ya eres un miembro oficial de Saikit!</h4>
                                <div className="form">
                                    <div className="action-button">
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                onClick={() => navigate(CONSTANT_ROUTES.user.login)}
                                            >
                                                Continuar
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            :
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
                                    <h1>Verifica tu correo</h1>
                                </div>
                                <div className="message">
                                    <p>Necesitamos verificar tu correo. Sigue las instrucciones enviadas a {Auth?.currentUser?.email}</p>
                                    <span>¿No has recibido el link de verificación de correo?</span>
                                </div>

                                <div className="form">
                                    <div className="action-field">
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                onClick={() => handleResendEmail()}
                                                disabled={isResendDisabled}
                                            >
                                                {
                                                    isResendDisabled ?
                                                        `Vuelve a intentarlo en ${Math.floor(countdown / 60)}:${countdown % 60} min`
                                                        :
                                                        'Enviar de nuevo'
                                                }
                                            </Button>
                                        </Form.Item>
                                    </div>
                                    <div className='term-condition'>
                                        <span>También puedes <Link className='info' to={CONSTANT_ROUTES.user.login} >continuar sin verificar</Link>e ingresar con acceso limitado</span>
                                    </div>
                                </div>
                            </div>
                        :
                        <>
                            <div className="header">
                                <h1>Regístrese para verificar el correo electrónico</h1>
                            </div>
                            <div className="form">
                                <div className="action-button">
                                    <Button onClick={() => navigate(CONSTANT_ROUTES.user.register)}>
                                        Registro
                                    </Button>
                                </div>
                            </div>
                        </>

                }
            </div>
        </div>
    );
}

export default VerifyEmail;
