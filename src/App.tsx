import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';

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
    </div>
  );
}

export default App;
