import React from 'react'
import { Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import { PATH_LIST } from '../../../config'

const LoginForm = ({data, error, handleChange, handleBlur}) => {
    return (
        <Form className="auth-form" layout="vertical" name="register-form">
            <div className="field">
                <Form.Item
                    label="Correo o usuario"
                    validateStatus={error?.email ? "error" : ""}
                    help={error?.email || ""}
                >
                    <Input
                        type="email"
                        placeholder="tunombre@email.com"
                        value={data.email}
                        onChange={(e) => handleChange(e, "email")}
                        onBlur={() => handleBlur("email", "¡correo electronico es requerido!")}
                    />
                </Form.Item>
            </div>
            <div className="field">
                <Form.Item
                    label="Contraseña"
                    validateStatus={error?.password ? "error" : ""}
                    help={error?.password || ""}
                >
                    <Input.Password
                        placeholder="Ingresa tu contraseña"
                        value={data.password}
                        onChange={(e) => handleChange(e, "password")}
                        onBlur={() => handleBlur("password", "contraseña!")}
                    />
                </Form.Item>
            </div>
            <div className="remember-me">
                <div className="remember">
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>Recuérdame</Checkbox>
                    </Form.Item>
                </div>
                <div className="forgot-password">
                    <Link to={PATH_LIST.USER.FORGOT_PASSWORD}>Olvidé mi contraseña</Link>
                </div>
            </div>

        </Form>
    )
}

export default LoginForm