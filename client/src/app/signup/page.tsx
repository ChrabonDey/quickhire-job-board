'use client';

import { useState } from 'react';
import { authService } from '@/services/api';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function SignupPage() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.register(formData);
            window.location.href = '/';
        } catch (err: any) {
            setError(err.response?.data?.error || 'Registration failed. Use a different email.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <Navbar />

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
                <div className="bg-white py-12 px-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-blue-50 sm:rounded-[2rem] sm:px-12 transition-all">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-[#4640DE] rounded-2xl mb-6 ring-4 ring-blue-50/50">
                            <UserPlus className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create Account</h2>
                        <p className="mt-3 text-gray-500 font-medium">Join our community of job seekers today</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-bold rounded-xl animate-shake">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-hover:text-blue-500 transition-colors">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400"
                                    placeholder="Create a strong password"
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
                            {loading ? 'Creating Account...' : (
                                <>
                                    Join QuickHire <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 pt-10 border-t border-gray-50 text-center">
                        <p className="text-gray-500 font-medium">
                            Already have an account?{' '}
                            <Link href="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                Log in instead
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Secondary Content */}
                <div className="mt-8 text-center text-gray-400 text-sm font-medium">
                    By joining, you agree to our <a href="#" className="underline hover:text-gray-600">Terms of Service</a> and <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>
                </div>
            </div>
        </main>
    );
}
