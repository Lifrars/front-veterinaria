'use client';
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axiosInstance from "@/utils/axios";// Ajusta la ruta según tu estructura de carpetas
import { useRouter } from 'next/navigation';

const CreateCliente = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = (values) => {
        console.log(values)
        axiosInstance.post('api/clientes', values)
            .then(() => {
                message.success('Cliente creado con éxito');
                router.push('/cliente');
            })
            .catch(error => message.error('Error al crear cliente'));
    };

    return (
        <div>
            <h1>Crear Cliente</h1>
            <Form form={form} onFinish={onFinish}>
                <Form.Item label="Cédula" name="cedula" rules={[{ required: true, message: 'Por favor ingrese la cédula' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Nombres" name="nombres" rules={[{ required: true, message: 'Por favor ingrese los nombres' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Apellidos" name="apellidos" rules={[{ required: true, message: 'Por favor ingrese los apellidos' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Dirección" name="direccion">
                    <Input />
                </Form.Item>
                <Form.Item label="Teléfono" name="telefono">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Crear</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateCliente;

