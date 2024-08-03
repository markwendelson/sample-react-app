import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGeoInfo, addHistory, fetchHistory, deleteHistory, toggleHistorySelection, clearSelectedHistory } from '../slices/geoSlice';
import { logout } from '../slices/userSlice';
import '../css/home.css'; 

const HomePage = () => {
    const [ip, setIp] = useState('');
    const dispatch = useDispatch();
    const { geoInfo, history, selectedHistory, status, error } = useSelector((state) => state.geo);

    useEffect(() => {
        dispatch(fetchHistory());
    }, [dispatch]);

    const handleSearch = () => {
        if (!ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
            alert('Invalid IP address');
            return;
        }
        dispatch(fetchGeoInfo(ip));
        dispatch(addHistory(ip));
    };

    const handleHistoryClick = (ip) => {
        setIp(ip);
        dispatch(fetchGeoInfo(ip));
    };

    const handleLogout = () => {
        dispatch(logout());
        window.location.href = '/login'; // Redirect to login page
    };

    const handleDeleteSelected = () => {
        dispatch(deleteHistory(selectedHistory));
    };

    const handleToggleSelection = (id) => {
        dispatch(toggleHistorySelection(id));
    };

    return (
        <div className="home-container">
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter IP"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>
            <button onClick={handleDeleteSelected} disabled={selectedHistory.length === 0} className="delete-button">
                Delete Selected
            </button>
            {status === 'loading' && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {geoInfo && (
                <div className="geo-info-card">
                    <h3>Geolocation Information:</h3>
                    <p><strong>IP:</strong> {geoInfo.ip}</p>
                    <p><strong>City:</strong> {geoInfo.city}</p>
                    <p><strong>Region:</strong> {geoInfo.region}</p>
                    <p><strong>Country:</strong> {geoInfo.country}</p>
                    <p><strong>Location:</strong> {geoInfo.loc}</p>
                </div>
            )}
            <h3>Search History</h3>
            <ul className="history-list">
                {history.map((record) => (
                    <li key={record.id} className="history-item">
                        <input
                            type="checkbox"
                            checked={selectedHistory.includes(record.id)}
                            onChange={() => handleToggleSelection(record.id)}
                        />
                        <button onClick={() => handleHistoryClick(record.ip)}>
                            {record.ip}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
