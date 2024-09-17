import { Layout } from "antd";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

const { Content, Footer } = Layout;

export function AuthenticatedLayout() {
    return <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
        <Layout>
            <Header />
            <Content>

            </Content>
            <Footer style={{ textAlign: 'center' }}>
                HYS ©{new Date().getFullYear()} Postersoft tarafından geliştirilmektedir
            </Footer>
        </Layout>
    </Layout>
}