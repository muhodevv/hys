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
        },
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
