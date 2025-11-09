import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';

function App() {
  return (
    <div>
      <div
        className='offcanvas offcanvas-start'
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'
      >
        <Sidebar />
      </div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
