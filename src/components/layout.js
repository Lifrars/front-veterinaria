'use client'
import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
    return (
        te">
                            Clientes
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link href="/mascota">
                            Mascotas
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link href="/medicamento">
                            Medicamentos
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0, textAlign: 'center' }}>
                    <h1>Centro Veterinario PETS S.A.</h1>
                </Header>
                <Content style={{ margin: '16px' }}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
