import { useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';

function App() {
  const [filter, setFilter] = useState('home');
  const [categoryId, setCategoryId] = useState<string | null>(null);

  return (
    <div>
      <div
        className='offcanvas offcanvas-start'
        id='offcanvasExample'
        aria-labelledby='offcanvasExampleLabel'
      >
        <Sidebar
          filter={filter}
          setFilter={setFilter}
          setCategoryId={setCategoryId}
        />
      </div>
      <Navbar />
      <Home filter={filter} categoryId={categoryId} />
    </div>
  );
}

export default App;
