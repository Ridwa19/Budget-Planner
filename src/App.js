import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import TransactionForm from './components/TransactionForm';
import Transactions from './components/Transactions';
import BudgetForm from './components/BudgetForm';
import BudgetManagement from './components/BudgetManagement';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAuthenticated(!!user);
            setLoadingAuth(false);
        });

        return () => unsubscribe();
    }, []);

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        toast.success('Successfully logged out');
    };

    if (loadingAuth) {
        return <p>Loading...</p>; // Display a loading message while checking auth status
    }

    return (
        <Router>
            <ToastContainer />
            <Navbar isAuthenticated={isAuthenticated} logout={logout} />
            <Routes>
                <Route path="/signin" element={<SignIn onSignIn={login} />} />
                <Route path="/signup" element={<SignUp onSignUp={login} />} />

                {isAuthenticated ? (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/budget-management" element={<BudgetManagement />} />
                        <Route path="/add-budget" element={<BudgetForm />} />
                        <Route path="/add-transaction/:budgetId" element={<TransactionForm />} />
                        <Route path="/transactions/:budgetId" element={<Transactions />} />
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/signin" />} />
                )}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
            </Routes>
        </Router>
    );
};

export default App;
