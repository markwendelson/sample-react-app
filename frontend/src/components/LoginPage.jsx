import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/userSlice';
import '../css/auth.css';

const LoginPage = () => {
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password');
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    if (status === 'succeeded') {
        // Redirect to home page after successful login
        window.location.href = '/';
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login" onSubmit={handleSubmit}>
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="email" className="login__input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="login__field">
                            <i className="login__icon fas fa-lock"></i>
                            <input type="password" className="login__input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button className="button login__submit" type="submit">
                            <span className="button__text">Log In Now</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>				
                    </form>                  
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>		
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>		
            </div>
        </div>
    );
};

export default LoginPage;
