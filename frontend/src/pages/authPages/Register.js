import React, { } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    Divider
} from 'antd';
import './Register.css'
import { Link } from 'react-router-dom';
import { PATHS } from '../../utils/config';
import axios from 'axios';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const Register = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const user = {
            email: values.email,
            password: values.password,
            username: values.username,
            lastname: values.lastname,
            cedula: values.cedula,
            phone: "+" + values.prefix + values.phone
        }
        console.log(user);

        const URL = `${PATHS.BASE_PATH}${PATHS.API_ROUTES.SIGNUP}`;

        axios.post(URL, user)
            .then(response => {
                console.log(response);
                alert('Usuario creado correctamente, puede iniciar sesión');
            })
            .catch(error => {
                console.error(error);
                alert('Hubo un error al crear el usuario, inténtalo mas tarde');
            });
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="57">+57</Option>
            </Select>
        </Form.Item>
    );

    return (
        <div className='form'>
            <h1>Bienvenidos a <br />
                Gestión de vehículos
            </h1>
            <Divider />

            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                initialValues={{
                    prefix: '57',
                }}
                style={{
                    maxWidth: 600,
                }}
                scrollToFirstError
                {...formItemLayout}
            >
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: '¡Introduce un email correcto!',
                        },
                        {
                            required: true,
                            message: 'Por favor, introduce tu email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Contraseña"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, introduce tu contraseña',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    layout="vertical"
                    label="Confirmar contraseña"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, confirma tu contraseña',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Username"
                    tooltip="¿Cómo quieres que te llamen los demás?"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, introduce tu nombre de usuario',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="lastname"
                    label="Apellido"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, introduce tu apellido',
                            whitespace: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="cedula"
                    label="Cédula"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, introduce tu cédula',
                        },
                    ]}
                >
                    <Input
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Celular"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, introduce tu número de celular',
                        },
                    ]}
                >
                    <Input
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                    />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Registrarse
                    </Button>
                </Form.Item>
            </Form>

            <div className='login'>
                <p>¿Ya tienes una cuenta?</p>
                <Link to="/login">Iniciar sesión</Link>
            </div>
        </div>
    );
};