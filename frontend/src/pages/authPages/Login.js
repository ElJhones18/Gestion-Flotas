import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Divider } from 'antd';
import './Login.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PATHS } from '../../utils/config';

export const Login = () => {
    const onFinish = (values) => {

        const credentials = {
            email: values.email,
            password: values.password
        }
        // console.log(credentials);
        const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LOGIN;
        // console.log(URL);
        axios.post(URL, credentials)
            .then((response) => {
                console.log(response.data);
                if (response.data.token) {
                    console.log(response.data.token);
                    // localStorage.setItem('token', response.data.token);
                    // window.location.href = '/';
                }
            })
            .catch((error) => {
                alert('Usuario o contraseña incorrectos');
                console.log(error);
            });
    };
    return (
        <div className='form'>

            <h1>Bienvenidos a <br />
                gestion de vehículos
            </h1>
            <Divider />

            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Introduce un E-mail correcto!',
                        },
                        {
                            required: true,
                            message: 'Por favor introduce tu E-mail!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor introduce tu contraseña!',
                        },
                    ]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Contraseña"
                    />

                </Form.Item>

                <Form.Item>
                    <div className='login-register'>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Ingresar
                        </Button> <br />
                        <p>No tienes una cuenta aún?</p>
                        <Link to="/register">Registrate ahora!</Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};