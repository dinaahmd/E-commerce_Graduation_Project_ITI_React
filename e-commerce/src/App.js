import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Header />
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
        </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;