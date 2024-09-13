'use client';
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import axiosInstance from "@/utils/axios";

const CreateMascota = () => {
    const [form] = Form.useForm();
    const router = useRouter();

    const onFinish = (values) => {
        console.log(values)
        axiosInstance.post('api/mascotas', values)
            .then(() => {
                message.success('Cliente creado con éxito');
                router.push('/cliente');
            })
            .catch(error => message.error('Error al crear cliente'));
    };

    return (
        <div>
            <h1>Crear Mascota</h1>
            <Form form={form} onFinish={onFinish}>
                <Form.Item label="Identificación" name="identificacion" rules={[{ required: true, message: 'Por favor ingrese la identificación' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Raza" name="raza" rules={[{ required: true, message: 'Por favor ingrese la raza' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Edad" name="edad" rules={[{ required: true, message: 'Por favor ingrese la edad' }]}>
                    <Input type="number" />
                </Form.Item>
                <Form.Item label="Peso" name="peso" rules={[{ required: true, message: 'Por favor ingrese el peso' }]}>
                    <Input type="number" step="0.1" />
                </Form.Item>
                <Form.Item label="Cédula del Cliente" name="clienteCedula" rules={[{ required: true, message: 'Por favor ingrese la cédula del cliente' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Crear</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateMascota;

