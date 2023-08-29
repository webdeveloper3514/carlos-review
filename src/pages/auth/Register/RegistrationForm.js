import { Checkbox, Form, Input } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const RegistrationForm = ({ handleChange, data, error, passValidate, handleBlur }) => {
    return (
        <Form className="auth-form" layout="vertical" name="register-form">
            <div className="double-col-field">
                <div className="field">
                    <Form.Item
                        label="Nombre"
                        validateStatus={error?.name ? "error" : ""}
                        help={error?.name || ""}
                    >
                        <Input
                            type="text"
                            placeholder="Tu Nombre"
                            value={data.name}
                            onChange={(e) => handleChange(e, "name")}
                            onBlur={() => handleBlur("name", "el nombre!")}
                            autoComplete="off"
                        />
                    </Form.Item>
                </div>
                <div className="field">
                    <Form.Item
                        label="Apellido"
                        validateStatus={error?.lastName ? "error" : ""}
                        help={error?.lastName || ""}
                    >
                        <Input
                            type="text"
                            placeholder="Tu apellido"
                            value={data.lastName}
                            onChange={(e) => handleChange(e, "lastName")}
                            onBlur={() => handleBlur("lastName", "apellido!")}
                            autoComplete="off"
                        />
                    </Form.Item>
                </div>
            </div>
            <div className="field">
                <Form.Item
                    label="Correo electrónico"
                    validateStatus={error?.email ? "error" : ""}
                    help={error?.email || ""}
                >
                    <span className="note-text">
                        Ingresa tu correo universitario para aumentar tu{" "}
                        <Link className="info">nivel de verificación</Link>
                    </span>
                    <Input
                        type="email"
                        placeholder="tunombre@email.com"
                        value={data.email}
                        onChange={(e) => handleChange(e, "email")}
                        onBlur={() => handleBlur("email", "¡correo electronico es requerido!")}
                        autoComplete="off"
                    />
                </Form.Item>
            </div>
            <div className="field">
                <Form.Item
                    label="Usuario"
                    validateStatus={error?.userName ? "error" : ""}
                    help={error?.userName || ""}
                >
                    <Input
                        type="text"
                        placeholder="¿Cómo te gustaría que te llamaramos?"
                        value={data.userName}
                        onChange={(e) => handleChange(e, "userName")}
                        onBlur={() => handleBlur("userName", "nombre de usuario!")}
                        autoComplete="off"
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
                        autoComplete="new-password"
                    />
                </Form.Item>
            </div>
            <div className="password-condition">
                <div className={`condition ${passValidate.lengthValid ? "complete" : ""}`}>
                    <Checkbox checked={passValidate.lengthValid} disabled />8 Caracteres
                </div>
                <div className={`condition ${passValidate.numberValid ? "complete" : ""}`}>
                    <Checkbox checked={passValidate.numberValid} disabled />1 Número (0-9)
                </div>
                <div className={`condition ${passValidate.lowercaseValid ? "complete" : ""}`} >
                    <Checkbox checked={passValidate.lowercaseValid} disabled />1 Letra minúscula (a-z)
                </div>
                <div className={`condition ${passValidate.specialCharValid ? "complete" : ""}`} >
                    <Checkbox checked={passValidate.specialCharValid} disabled />1 Carácter especial (./$&*#!)
                </div>
                <div className={`condition ${passValidate.uppercaseValid ? "complete" : ""}`}>
                    <Checkbox checked={passValidate.uppercaseValid} disabled />1 Letra mayúscula (A-Z)
                </div>
            </div>
        </Form>
    );
};

export default RegistrationForm;
