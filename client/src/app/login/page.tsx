'use client';

import { useState } from 'react';
import { authService } from '@/services/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await authService.login(formData);
            window.location.href = data.role === 'admin' ? '/admin' : '/';
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <Navbar />

            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-white py-12 px-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 sm:rounded-[2rem] sm:px-12 transition-all">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-6">
                            <LogIn className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back</h2>
                        <p className="mt-3 text-gray-500 font-medium">Log in to your account to continue</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl animate-shake">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                                <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">Forgot?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all text-gray-900 font-medium"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center gap-3 py-4 px-6 bg-[#4640DE] text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Logging in...' : (
                                <>
                                    Login to Account <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-gray-50 text-center">
                        <p className="text-gray-500 font-medium">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
