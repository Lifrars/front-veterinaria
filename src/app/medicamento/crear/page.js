'use client';
import React, {useEffect, useState} from 'react';
import {Form, Input, Button, message, Select} from 'antd';
import { useRouter } from 'next/navigation';
import axiosInstance from "@/utils/axios";

const CreateMedicamento = () => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [mascotas,setMascotas] = useState([]);
    const { Option } = Select;
    const onFinish = (values) => {
        axiosInstance.post('api/medicamentos', values)
            .then(() => {
                message.success('Medicamento creado con éxito');
                router.push('/medicamento');
            })
            .catch(error => message.error('Error al crear medicamento'));
    };
    useEffect(() => {
        axiosInstance.get(`api/mascotas`)
            .then(response => setMascotas(response.data))
            .catch(error => console.error('Error fetching medication:', error));
    }, []);

    return (
        <div>
            <h1>Crear Medicamento</h1>
            <Form form={form} onFinish={onFinish}>
                <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name="descripcion">
                    <Input />
                </Form.Item>
                <Form.Item label="Dosis" name="dosis">
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Identificacion perro"
                    name="mascotaIdentificacion"
                    rules={[{ required: true, message: 'Por favor seleccione el perro' }]}
                >
                    <Select
                        showSearch
                        placeholder="Seleccione un perro"
                        optionFilterProp="children"
                    >
                        {mascotas.map(mascota => (
                            <Option key={mascota.identificacion} value={mascota.identificacion}>
                                {mascota.nombre}
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

export default CreateMedicamento;
