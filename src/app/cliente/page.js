
"use client";
import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import Link from 'next/link';
import axiosInstance from "@/utils/axios";
import AppLayout from "@/components/layout";

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axiosInstance.get('api/clientes')
            .then(response => setClientes(response.data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`api/clientes/${id}`);
            message.success('Cliente eliminado con éxito');
            setClientes(clientes.filter(cliente => cliente.cedula !== id));
        } catch (error) {
            message.error('Error al eliminar cliente');
        }
    };

    const columns = [
        {
            title: 'Cédula',
            dataIndex: 'cedula',
            key: 'cedula',
        },
        {
            title: 'Nombres',
            dataIndex: 'nombres',
            key: 'nombres',
        },
        {
            title: 'Apellidos',
            dataIndex: 'apellidos',
            key: 'apellidos',
        },
        {
            title: 'Dirección',
            dataIndex: 'direccion',
            key: 'direccion',
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <>
                    <Link href={`/cliente/edit/${record.cedula}`}>
                        <Button type="link">Editar</Button>
                    </Link>
                    <Button type="link" danger onClick={() => handleDelete(record.cedula)}>
                        Eliminar
                    </Button>
                </>
            ),
        },
    ];

    return (
        <AppLayout>
        <div>
            <h1>Lista de Clientes</h1>
            <Link href="/cliente/crear">
                <Button type="primary">Crear Cliente</Button>
            </Link>
            <Table dataSource={clientes} columns={columns} rowKey="cedula" />
        </div>
        </AppLayout>
    );
};

export default ClienteList;


