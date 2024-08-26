import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axios'; // Importe o axios configurado
import backgroundImage from '../assets/auth_img.jpg'; // Caminho para a imagem de fundo
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { registerUser } from '../services/apiService';

function Register({ login, showSnackbar }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Use useEffect to clear form fields on mount
    useEffect(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await registerUser(username, email, password, confirmPassword); // Use a função de registro
            localStorage.setItem('authToken', response.data.token);
            login();
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            showSnackbar('Register failed. Please check your credentials.', 'error');
        }
    };

    return (
        <div className="h-screen flex flex-col md:flex-row">
            {/* Formulário */}
            <div className="w-full md:w-6/12 flex flex-col p-4 bg-[#141313] border-b-4 md:border-r-4 border-b-[#B22222] md:border-r-[#B22222] text-white">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center self-end">
                        <Link to="/" className="text-white mr-2"><FaArrowLeft /></Link>
                        <h2 className="text-xl font-extrabold underline">Register</h2>
                    </div>
                    <div className="flex-shrink-1">
                        <img src={logo} alt="Logo" className="h-36" />
                    </div>
                </div>
                <form className="flex flex-col h-full justify-between space-y-4" onSubmit={handleRegister}>
                    <div>
                        <div className="mb-4">
                            <label className="block mb-1 font-bold">Username</label>
                            <input
                                type="text"
                                className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]"
                                placeholder="Your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-bold">Email</label>
                            <input
                                type="email"
                                className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-bold">Password</label>
                            <input
                                type="password"
                                className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]"
                                placeholder="Your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-bold">Confirm Password</label>
                            <input
                                type="password"
                                className="text-black w-full p-2 rounded border border-[#B22222] border-[3px]"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="pb-10">
                        <div className="flex justify-center">
                            <button type="submit" className="bg-[#8B0000] text-white p-2 rounded font-bold px-16 py-3">Register</button>
                        </div>
                        <div className="text-center mt-2">
                            <p>
                                Already have an account? <Link to="/login" className="underline text-[#B22222] font-bold">Login here</Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* Imagem de fundo */}
            <div className="w-full md:w-6/12 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                {/* Imagem de fundo, pode adicionar mais estilizações aqui */}
            </div>
        </div>
    );
}

export default Register;
