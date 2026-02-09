<<<<<<< HEAD
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Components/Header";
import Budget from "./Components/Budget";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';

import AuthState from './context/authState';
import IncomeState from './context/incomeState';
import ExpenseState from './context/expenseState';

import './App.css';

const App = () => {
  return (
    <AuthState>
      <IncomeState>
        <ExpenseState>
          <Router>
            <div className='bg-container'>
              <div className="responsive-container">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>
          </Router>
        </ExpenseState>
      </IncomeState>
    </AuthState>
  );
};
=======
import Budget from "./Components/Budget"
import Header from "./Components/Header"
import './App.css';

const App = () =>  (
    <div className='bg-container'>
      <div className="responsive-container">
        <Header/>
        <Budget/>
      </div>
    </div>
)
>>>>>>> parent of 88f52bc (Backend and Frontend Setup)

export default App;
