import { CheckCircleOutlined, ContainerOutlined, HomeOutlined, LineChartOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";

const { Sider } = Layout;

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    return <Sider className="px-2" width={225} collapsible theme="light" collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="h-16 px-6 flex items-center">
            <h1 className="font-bold text-xl">HYS</h1>
        </div>
        <Menu rootClassName="!border-0" theme="light" defaultSelectedKeys={['1']} mode="inline" items={[
            {
                key: "1",
                label: "Ana Sayfa",
                icon: <HomeOutlined />
            },
            {
                key: "2",
                label: "İcra",
                icon: <ContainerOutlined />
            },
            {
                key: "3",
                label: "Cariler",
                icon: <UserOutlined />
            },
            {
                key: "4",
                label: "Raporlar",
                icon: <LineChartOutlined />
            },
            {
                key: "5",
                label: "Görevler",
                icon: <CheckCircleOutlined />
            },
            {
                key: "6",
                label: "Ayarlar",
                icon: <SettingOutlined />
            }
        ]} />
    </Sider>
}