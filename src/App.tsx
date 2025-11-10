import { useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';

function App() {
  const [filter, setFilter] = useState('home');

  return (
    <div>
      <div
        className='offcanvas offcanvas-start'
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'
      >
        <Sidebar filter={filter} setFilter={setFilter} />
      </div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
