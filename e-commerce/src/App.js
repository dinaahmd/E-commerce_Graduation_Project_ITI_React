import './App.css';
import Store from './components/Store';
import ProductDetails from './components/ProductDetails';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import CartPage from './pages/CartPage';
import BestSelling from './components/BestSelling';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* <Header /> */}
          <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={Register} />
            <Route path='/store' component={ Store } />
            <Route path='/cart' component={ CartPage } />
            <Route path='/products/:id' component={ProductDetails} />
            <Route path='/bestselling' component={BestSelling} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;