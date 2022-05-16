import { Provider, useSelector } from 'react-redux'
import store from './reducer'
import './App.css';
import {
  Navigate,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useState } from 'react';


function RequireAuth({ children }) {
  const auth = useSelector(app => app.auth)
  let location = useLocation()

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


function App() {
  return (
    <Provider store={store}>
      <div className="bg-slate-300 w-screen h-screen">
        <Routes>
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route 
            exact 
            path="/" 
            element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            } 
          />
          <Route exact path="*" element={<Home/>} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
