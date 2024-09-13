'use client'
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import axiosInstance from "@/utils/axios";
import AppLayout from "@/components/layout";

const ReporteMedicamentosClientes = () => {
    const [reporte, setReporte] = useState([]);

    useEffect(() => {
        axiosInstance.get("/api/clientes")
            .then((response) => {
                setReporte(response.data);
            })
            .catch((error) => {
                console.error("Hubo un error al obtener el reporte: ", error);
            });
    }, []);

    const columns = [
        {
            title: "Cliente",
            dataIndex: "nombres",
            key: "nombres",
            render: (text, record) => `${record.nombres} ${record.apellidos}`,
        },
        {
            title: "Dirección",
            dataIndex: "direccion",
            key: "direccion",
        },
        {
            title: "Teléfono",
            dataIndex: "telefono",
            key: "telefono",
        },
        {
            title: "Mascotas y Medicamentos",
            key: "mascotas",
            render: (record) => (
                <ul>
                    {record.mascotas.map((mascota) => (
                        <li key={mascota.identificacion}>
                            <strong>{mascota.nombre}</strong> ({mascota.raza}, {mascota.edad} años, {mascota.peso} kg):
                            <ul>
                                {mascota.medicamentos.length > 0 ? (
                                    mascota.medicamentos.map((medicamento) => (
                                        <li key={medicamento.id}>
                                            {medicamento.nombre} - {medicamento.descripcion} ({medicamento.dosis})
                                        </li>
                                    ))
                                ) : (
                                    <li>Sin medicamentos</li>
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    return (
        <AppLayout>
        <div>
            <h1>Reporte de Medicamentos y Clientes</h1>
            <Table dataSource={reporte} columns={columns} rowKey="cedula" />
        </div>
        </AppLayout>
    );
};

export default ReporteMedicamentosClientes;

