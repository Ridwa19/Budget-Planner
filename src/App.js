import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import AddBudgetForm from './components/AddBudgetForm';
import BudgetList from './components/BudgetList';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import Navbar from './components/Navbar';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
            <Routes>
                <Route path="/signin" element={<SignIn onSignIn={login} />} />
                <Route path="/signup" element={<SignUp onSignUp={login} />} />
                
                {isAuthenticated ? (
                    <>
                        <Route path="/budgets" element={<BudgetList />} />
                        <Route path="/add-budget" element={<AddBudgetForm />} />
                        <Route path="/add-transaction/:budgetId" element={<AddTransactionForm />} />
                        <Route path="/transactions/:budgetId" element={<TransactionList />} />
                        <Route path="/" element={<Navigate to="/budgets" />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/signin" />} />
                )}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/budgets" : "/signin"} />} />
            </Routes>
        </Router>
    );
};

export default App;
