'use client'
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axiosInstance from "@/utils/axios";// Ajusta la ruta según tu estructura de carpetas
import { useRouter } from 'next/navigation';

const EditCliente = ({ params }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { id } = params;
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        axiosInstance.get(`api/clientes/${id}`)
            .then(response => setCliente(response.data))
            .catch(error => console.error('Error fetching client:', error));
    }, [id]);

    const onFinish = (values) => {
        console.log(values);
        axiosInstance.put(`api/clientes/${id}`, values)
            .then(() => {
                message.success('Cliente actualizado con éxito');
                router.push('/cliente');
            })
            .catch(error => message.error('Error al actualizar cliente'));
    };

    return (
        <div>
            <h1>Editar Cliente</h1>
            {cliente && (
                <Form form={form} initialValues={cliente} onFinish={onFinish}>
                    <Form.Item label="Cédula" name="cedula" rules={[{ required: true, message: 'Por favor ingrese la cédula' }]}>
                        <Input disabled />
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
                        <Button type="primary" htmlType="submit">Actualizar</Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default EditCliente;

