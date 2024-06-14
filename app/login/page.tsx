"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        try {
          if (email === 'admin@dash.com' && password === 'password') {
            localStorage.setItem('auth', "true");
            router.push('/dashboard');
          } else {
            setError('Invalid email or password');
          }
        } catch (err) {
          setError('An error occurred');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-blue-300 via-gray-200 to-purple-300">
            <form onSubmit={handleSubmit} className="bg-white p-8 space-y-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Proceed</button>
            </form>
        </div>
    );
};

export default LoginPage;
