
import './App.css';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import SidebarSmallScreen from './components/SidebarSmallScreen';
import { useTheme } from './context/ThemeContext';


function App() {

  const { theme } = useTheme();


  return (
    <div className={`app ${theme}`}>
      <div className="container">
        <SidebarSmallScreen />
        <Sidebar />
        <ChatBox/>
      </div>
    </div>
  );
}

export default App;
