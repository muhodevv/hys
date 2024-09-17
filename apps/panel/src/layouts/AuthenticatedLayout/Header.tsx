import { BellOutlined, NotificationOutlined } from "@ant-design/icons";
import { Avatar, Button, Input, Layout } from "antd";

export function Header() {
    return <Layout.Header className="flex items-center justify-between bg-white">
        <div className="flex-1 max-w-[350px] flex items-center">
            <Input.Search size="large" placeholder="Ara..." />
        </div>
        <div className="flex items-center gap-x-4">
            <Button className="rounded-full" size={"large"} icon={<BellOutlined />}></Button>
            <Button icon={<Avatar style={{ backgroundColor: "#f56a00" }} size="large">
                MY
            </Avatar>} />
        </div>

    </Layout.Header>
}