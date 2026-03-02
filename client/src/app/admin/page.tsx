'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { jobService, authService } from '@/services/api';
import { Job } from '@/types';
import { Plus, Trash2, Briefcase, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const [newJob, setNewJob] = useState({
        title: '',
        company: '',
        location: '',
        category: 'Technology',
        type: 'Full Time',
        salary: '',
        description: ''
    });

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await jobService.getAll();
            setJobs(data);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const user = authService.getUser();
        if (!user || user.role !== 'admin') {
            window.location.href = '/login';
            return;
        }
        fetchJobs();
    }, []);

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await jobService.create(newJob);
            setShowModal(false);
            setNewJob({
                title: '',
                company: '',
                location: '',
                category: 'Technology',
                type: 'Full Time',
                salary: '',
                description: ''
            });
            fetchJobs();
        } catch (error: any) {
            console.error('Failed to create job:', error);
            alert(error.response?.data?.message || 'Failed to create job.');
        }
    };

    const handleDeleteJob = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            try {
                await jobService.delete(id);
                fetchJobs();
            } catch (error) {
                console.error('Failed to delete job:', error);
                alert('Failed to delete job.');
            }
        }
    };

    return (
        <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
                        <p className="text-gray-500 font-medium">Manage your job listings and applications</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/admin/applications" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                            View Applications
                        </Link>
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" /> Add New Job
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-widest">Job Info</th>
                                    <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-widest">Category & Type</th>
                                    <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-widest">Location</th>
                                    <th className="px-8 py-6 text-sm font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr><td colSpan={4} className="px-8 py-12 text-center text-gray-400">Loading jobs...</td></tr>
                                ) : jobs.length === 0 ? (
                                    <tr><td colSpan={4} className="px-8 py-12 text-center text-gray-400">No jobs found.</td></tr>
                                ) : (
                                    jobs.map((job) => (
                                        <tr key={job._id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                                        {job.company[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{job.title}</p>
                                                        <p className="text-sm text-gray-400">{job.company}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-bold text-gray-700">{job.category}</span>
                                                    <span className="text-xs text-gray-400">{job.type}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <MapPin className="w-4 h-4 text-gray-400" />
                                                    {job.location}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/jobs/${job._id}`} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                                                        <Search className="w-5 h-5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteJob(job._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Job Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
                        <div className="p-8 lg:p-12">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-3xl font-extrabold text-gray-900">Post a new job</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 font-bold text-2xl">&times;</button>
                            </div>

                            <form onSubmit={handleCreateJob} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Job Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                                            placeholder="Software Engineer"
                                            value={newJob.title}
                                            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Company Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                                            placeholder="Google"
                                            value={newJob.company}
                                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Category</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                                            value={newJob.category}
                                            onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                                        >
                                            <option>Design</option>
                                            <option>Technology</option>
                                            <option>Marketing</option>
                                            <option>Human Resource</option>
                                            <option>Sales</option>
                                            <option>Finance</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Job Type</label>
                                        <select
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
                                            value={newJob.type}
                                            onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                                        >
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                            <option>Contract</option>
                                            <option>Freelance</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                                            placeholder="Remote"
                                            value={newJob.location}
                                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Salary Range</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                                            placeholder="$50k - $80k"
                                            value={newJob.salary}
                                            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700">Job Description</label>
                                    <textarea
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none resize-none"
                                        placeholder="Describe the role..."
                                        value={newJob.description}
                                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-2 py-4 px-12 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
                                    >
                                        Create Job Listing
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
