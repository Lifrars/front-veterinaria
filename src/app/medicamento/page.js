'use client'
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import Link from 'next/link';
import axiosInstance from "@/utils/axios";

const MascotaList = () => {
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        axiosInstance.get('api/mascotas')
            .then(response => setMascotas(response.data))
            .catch(error => console.error('Error fetching pets:', error));
    }, []);

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
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Link href={`/mascota/${record.identificacion}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Link href={`/mascota/${record.identificacion}/delete`}>
                        <Button type="link" danger>Eliminar</Button>
                    </Link>
                </>
            ),
        },
    ];

    return (
        <div>
            <h1>Lista de Mascotas</h1>
            <Link href="/mascota/crear">
                <Button type="primary">Crear Mascota</Button>
            </Link>
            <Table dataSource={mascotas} columns={columns} rowKey="identificacion" />
        </div>
    );
};

export default MascotaList;
