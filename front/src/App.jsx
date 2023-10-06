
import './App.css';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import SidebarSmallScreen from './components/SidebarSmallScreen';


function App() {
  return (
    <div className="app">
      <div className="container">
        <SidebarSmallScreen/>
        <Sidebar/>
        <ChatBox/>
      </div>
    </div>
  );
}

export default App;
