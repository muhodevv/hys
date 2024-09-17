import { ConfigProvider } from 'antd'
import './App.css'
import { AuthProvider } from './providers'
import { AuthenticatedLayout, UnAuthenticatedLayout } from './layouts'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#5A54F9',
          borderRadius: 20,
          colorBgLayout: '#FFF',
        },
        components: {
          Layout: {
            siderBg: '#f9f9f9',
            lightSiderBg: '#f9f9f9',
          },
          Menu: {
            colorBgContainer: '#f9f9f9',
          }
        }
      }}
    >
      <AuthProvider>
        {({ isFetching, isLoggedIn }) => {
          if (isFetching) return <div>Loading...</div>
          if (!isLoggedIn) return <UnAuthenticatedLayout></UnAuthenticatedLayout>

          return <AuthenticatedLayout />
        }}
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
