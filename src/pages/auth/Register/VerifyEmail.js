import { sendEmailVerification } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Auth } from '../../../firebase/config';
import artwork from '../../../assets/images/artwork.svg'
import { Link, useNavigate } from 'react-router-dom';
import { PATH_LIST } from '../../../config';
import { Button, Form } from 'antd';
import BenifitesModal from '../../../Components/Modal/BenifitesModal';

const VerifyEmail = () => {
    const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [benifitModal, setBenifitModal] = useState(false)
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

    const [isEmailVerified, setIsEmailVerified] = useState(false); // Track email verification status

    useEffect(() => {
        const unsubscribe = Auth.onAuthStateChanged(user => {
            if (user) {
                setIsEmailVerified(user.emailVerified);
            } else {
                setIsEmailVerified(false);
            }
        });

        return () => unsubscribe(); // Clean up the observer when component unmounts
    }, []);
    return (
        <>
            <div className="auth-section verify-email-page">
                <div className="auth-left">
                    <img src={artwork} alt="artwork" />
                </div>
                <div className="auth-right">
                    {
                        Auth.currentUser ?
                            Auth?.currentUser?.emailVerified ?
                                <div className='fixed-width'>
                                    <div className='header'>
                                        <h1>
                                            Tu correo ha sido verificado
                                        </h1>
                                    </div>
                                    <h4>¡Ya eres un miembro oficial de Saikit!</h4>

                                    <p>
                                        Recuerda completar tu perfil para desbloquear todas las funcionalidades y tener accesos ilimitados.
                                        <span className="icon" onClick={()=> setBenifitModal(true)}>
                                        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="11.5" cy="11.5" r="11.5" fill="#5C30A1" fill-opacity="0.1"/>
                                            <path d="M11.3828 8.10938C12.1094 8.10938 12.6953 7.57812 12.6953 6.875C12.6953 6.15625 12.1094 5.63281 11.3828 5.63281C10.6562 5.63281 10.0703 6.15625 10.0703 6.875C10.0703 7.57812 10.6562 8.10938 11.3828 8.10938ZM12.8125 9.13281L9.34375 9.55469V9.91406L9.74219 10.0391C10.1797 10.1875 10.2422 10.2969 10.2422 10.8047V15.7578C10.2422 16.3203 10.1016 16.4844 9.34375 16.6172V17H13.7109V16.6172C12.9531 16.4844 12.8125 16.3203 12.8125 15.7578V9.13281Z" fill="#5C30A1"/>
                                        </svg>
                                        </span>
                                    </p>
                                    <div className="form">
                                        <div className="action-button">
                                            <Form.Item>
                                                <Button
                                                    type="primary"
                                                    htmlType="submit"
                                                    onClick={() => navigate(PATH_LIST.user.login)}
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
                                            <span>También puedes <Link className='info' to={PATH_LIST.user.login} >continuar sin verificar</Link>e ingresar con acceso limitado</span>
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
                                        <Button onClick={() => navigate(PATH_LIST.user.register)}>
                                            Registro
                                        </Button>
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
            {
                benifitModal && 
                <BenifitesModal
                    state={benifitModal}
                    setState={setBenifitModal} 
                />
            }
        </>
    );
}

export default VerifyEmail;
