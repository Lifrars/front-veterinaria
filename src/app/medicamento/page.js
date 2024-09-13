'use client'
import React, { useEffect, useState } from 'react';
import {Table, Button, message, Select} from 'antd';
import Link from 'next/link';
import axiosInstance from "@/utils/axios";
import AppLayout from "@/components/layout"; // Ajusta la ruta según tu estructura de carpetas

const MedicamentoList = () => {
    const [medicamentos, setMedicamentos] = useState([]);
    const { Option } = Select;
    useEffect(() => {
        axiosInstance.get('api/medicamentos')
            .then(response => setMedicamentos(response.data))
            .catch(error => console.error('Error fetching medications:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`api/medicamentos/${id}`);
            message.success('Medicamento eliminado con éxito');
            setMedicamentos(medicamentos.filter(medicamento => medicamento.id !== id));
        } catch (error) {
            message.error('Error al eliminar medicamento');
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Dosis',
            dataIndex: 'dosis',
            key: 'dosis',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Link href={`/medicamento/editar/${record.id}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <AppLayout>
        <div>
            <h1>Lista de Medicamentos</h1>
            <Link href="/medicamento/crear">
                <Button type="primary">Crear Medicamento</Button>
            </Link>
            <Table dataSource={medicamentos} columns={columns} rowKey="id" />
        </div>
        </AppLayout>
    );
};

export default MedicamentoList;
