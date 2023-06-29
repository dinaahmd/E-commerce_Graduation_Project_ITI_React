import './App.css';
import { Route, Routes } from 'react-router-dom';
import Store from './components/Store';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/store' element={<Store />} />
        <Route path='/products/:id' element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
