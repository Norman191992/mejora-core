import { ConfigProvider } from "antd";
import "./App.css";
import { AuthProvider } from './context/AuthContext';
import esES from 'antd/locale/es_ES';
import ScootersApp from "./pages/ScootersApp";

function App() {

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffa500',
          },
        }}
        locale={esES}
      >
        <AuthProvider>
          <ScootersApp />
        </AuthProvider>
      </ConfigProvider>
    </div>
  );
}

export default App