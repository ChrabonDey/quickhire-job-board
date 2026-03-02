'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authService } from '@/services/api';

const Navbar = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        setUser(authService.getUser());
    }, []);

    const handleLogout = () => {
        authService.logout();
        setUser(null);
        window.location.href = '/';
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/Logo.png" alt="QuickHire" className="w-8 h-8 object-contain" />
                            <span className="text-2xl font-extrabold text-[#1D1E25] tracking-tight">QuickHire</span>
                        </Link>
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-[15px] font-bold text-gray-500 hover:text-blue-600 transition-colors">Find Jobs</Link>
                            <Link href="#" className="text-[15px] font-bold text-gray-500 hover:text-blue-600 transition-colors">Browse Companies</Link>
                            {user?.role === 'admin' && (
                                <Link href="/admin" className="text-[15px] font-bold text-blue-600 border-b-2 border-blue-600">Admin Panel</Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-8">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-bold text-gray-700 hidden sm:inline">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-[15px] font-bold text-blue-600 hover:text-blue-700 transition-colors">Login</Link>
                                <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
                                <Link href="/signup" className="px-6 py-3 bg-[#4640DE] text-white rounded-lg text-[15px] font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

