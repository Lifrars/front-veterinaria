'use client';
import React, {useEffect, useState} from 'react';
import { Form, Select,Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import axiosInstance from "@/utils/axios";
const { Option } = Select;

const CreateMascota = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [clientes, setClientes] =useState([]);
    useEffect(() => {
        axiosInstance.get('api/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);
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
                <Form.Item
                    label="Cédula del Cliente"
                    name="clienteCedula"
                    rules={[{ required: true, message: 'Por favor seleccione la cédula del cliente' }]}
                >
                    <Select
                        showSearch
                        placeholder="Seleccione un cliente"
                        optionFilterProp="children" // Busca en el contenido de las opciones
                    >
                        {clientes.map(cliente => (
                            <Option key={cliente.cedula} value={cliente.cedula}>
                                {cliente.nombres} {cliente.apellidos} - {cliente.cedula}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Crear</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateMascota;

