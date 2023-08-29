import React from 'react'
import { Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'

const LoginForm = ({data, error, handleChange, handleBlur}) => {
    return (
        <Form className="auth-form" layout="vertical" name="register-form">
            <div className="field">
                <Form.Item
                    label="Correo electrónico"
                    validateStatus={error?.email ? "error" : ""}
                    help={error?.email || ""}
                >
                    <Input
                        type="email"
                        placeholder="tunombre@email.com"
                        value={data.email}
                        onChange={(e) => handleChange(e, "email")}
                        onBlur={() => handleBlur("email", "¡correo electronico es requerido!")}
                        autoCapitalize='on'
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
                        autoComplete="off"
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
                    {/* <Checkbox /> */}
                </div>
                <div className="forgot-password">
                    <Link to="/forgotPassword">Olvidé mi contraseña</Link>
                </div>
            </div>

        </Form>
    )
}

export default LoginForm