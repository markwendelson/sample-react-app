import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../src/components/LoginPage.jsx';
import HomePage from '../src/components/HomePage.jsx';
import { useSelector } from 'react-redux';

const App = () => {
    const token = useSelector((state) => state.user.token);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
                <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;