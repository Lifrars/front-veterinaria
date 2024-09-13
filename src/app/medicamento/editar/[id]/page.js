'use client'
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import axiosInstance from "@/utils/axios";

const EditMedicamento = ({ params }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const { id } = params;
    const [medicamento, setMedicamento] = useState(null);

    useEffect(() => {
        axiosInstance.get(`api/medicamentos/${id}`)
            .then(response => setMedicamento(response.data))
            .catch(error => console.error('Error fetching medication:', error));
    }, [id]);

    const onFinish = (values) => {
        axiosInstance.put(`api/medicamentos/${id}`, values)
            .then(() => {
                message.success('Medicamento actualizado con éxito');
                router.push('/medicamento');
            })
            .catch(error => message.error('Error al actualizar medicamento'));
    };

    return (
        <div>
            <h1>Editar Medicamento</h1>
            {medicamento && (
                <Form form={form} initialValues={medicamento} onFinish={onFinish}>
                    <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Descripción" name="descripcion">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Dosis" name="dosis">
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

export default EditMedicamento;

