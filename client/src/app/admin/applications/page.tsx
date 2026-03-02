'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { applicationService, authService } from '@/services/api';
import { Application, Job } from '@/types';
import { FileText, Mail, User, Briefcase, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = authService.getUser();
        if (!user || user.role !== 'admin') {
            window.location.href = '/login';
            return;
        }

        const fetchApplications = async () => {
            try {
                const data = await applicationService.getAll();
                setApplications(data);
            } catch (error) {
                console.error('Failed to fetch applications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/admin" className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back to dashboard
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Job Applications</h1>
                    <p className="text-gray-500 font-medium">Review candidates who applied for your listings</p>
                </div>

                {loading ? (
                    <div className="text-center py-20 text-gray-400">Loading applications...</div>
                ) : applications.length === 0 ? (
                    <div className="bg-white rounded-[2rem] p-20 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-400">Applications will appear here once candidates start applying.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {applications.map((app) => (
                            <div key={app._id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                                            {app.name[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{app.name}</h3>
                                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                                <Mail className="w-3.5 h-3.5" />
                                                {app.email}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-bold rounded-full">
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                                    <div className="flex items-center gap-2 mb-4 text-sm font-bold text-blue-600 uppercase tracking-wider">
                                        <Briefcase className="w-4 h-4" />
                                        Applied For
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900">
                                        {(app.jobId as Job)?.title || 'Unknown Position'}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-medium">{(app.jobId as Job)?.company || 'Unknown Company'}</p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-3">Cover Note</p>
                                    <p className="text-gray-600 text-sm italic leading-relaxed">
                                        &quot;{app.coverNote}&quot;
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <a
                                        href={app.resumeLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-3 bg-white border border-blue-600 text-blue-600 font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                                    >
                                        View Resume <ExternalLink className="w-4 h-4" />
                                    </a>
                                    <button className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-sm active:scale-95">
                                        Contact Candidate
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
