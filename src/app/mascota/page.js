'use client'
import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import Link from 'next/link';
import axiosInstance from "@/utils/axios";
import AppLayout from "@/components/layout";

const MascotaList = () => {
    const [mascotas, setMascotas] = useState([]);
    useEffect(() => {
        axiosInstance.get('api/mascotas')
            .then(response => setMascotas(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);


    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`api/mascotas/${id}`);
            message.success('Mascota eliminada con éxito');
            setMascotas(mascotas.filter(mascota => mascota.identificacion !== id));
        } catch (error) {
            message.error('Error al eliminar mascota');
        }
    };

    const columns = [
        {
            title: 'Identificación',
            dataIndex: 'identificacion',
            key: 'identificacion',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Raza',
            dataIndex: 'raza',
            key: 'raza',
        },
        {
            title: 'Edad',
            dataIndex: 'edad',
            key: 'edad',
        },
        {
            title: 'Peso',
            dataIndex: 'peso',
            key: 'peso',
        },
        {
            title: 'Cédula del Cliente',
            dataIndex: 'clienteCedula',
            key: 'clienteCedula',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Link href={`/mascota/editar/${record.identificacion}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Button type="link" danger onClick={() => handleDelete(record.identificacion)}>
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <AppLayout>
        <div>
            <h1>Lista de Mascotas</h1>
            <Link href="/mascota/crear">
                <Button type="primary">Crear Mascota</Button>
            </Link>
            <Table dataSource={mascotas} columns={columns} rowKey="identificacion" />
        </div>
        </AppLayout>
    );
};

export default MascotaList;

