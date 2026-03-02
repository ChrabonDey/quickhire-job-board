'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { jobService, applicationService } from '@/services/api';
import { Job } from '@/types';
import { MapPin, Briefcase, DollarSign, Clock, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage() {
    const { id } = useParams();
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resumeLink: '',
        coverNote: ''
    });

    useEffect(() => {
        if (id) {
            const fetchJob = async () => {
                try {
                    const data = await jobService.getById(id as string);
                    setJob(data);
                } catch (error) {
                    console.error('Failed to fetch job:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchJob();
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await applicationService.submit({
                jobId: id as string,
                ...formData
            });
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to submit application:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!job) return <div className="min-h-screen flex items-center justify-center">Job not found.</div>;

    return (
        <main className="min-h-screen bg-gray-50/50 pt-24 pb-20">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all">
                    <ArrowLeft className="w-4 h-4" /> Back to jobs
                </Link>

                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mb-10">
                    <div className="p-8 lg:p-12 border-b border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                    <img src={job.logo || `https://ui-avatars.com/api/?name=${job.company}`} className="w-12 h-12 object-contain" alt={job.company} />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{job.title}</h1>
                                    <p className="text-lg text-gray-500 font-medium">{job.company} • {job.location}</p>
                                </div>
                            </div>
                            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                                Apply Now
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Salary</p>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <DollarSign className="w-4 h-4 text-blue-600" />
                                    <span>{job.salary || 'Competitive'}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Job Type</p>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Briefcase className="w-4 h-4 text-blue-600" />
                                    <span>{job.type}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Location</p>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Posted At</p>
                                <div className="flex items-center gap-2 text-gray-900 font-bold">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 lg:p-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p>{job.description}</p>
                            <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Requirements</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>3+ years of experience in the field</li>
                                <li>Strong communication and teamwork skills</li>
                                <li>Ability to work in a fast-paced environment</li>
                                <li>Bachelor degree in related field or equivalent experience</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Application Form */}
                <div id="apply" className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-8 lg:p-12">
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Application Sent!</h2>
                                <p className="text-gray-500 mb-8">Thank you for applying. We&apos;ll get back to you soon.</p>
                                <Link href="/" className="text-blue-600 font-bold hover:underline">Browse more jobs</Link>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Ready to apply?</h2>
                                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Full Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Resume Link (URL)</label>
                                        <input
                                            type="url"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all"
                                            placeholder="https://drive.google.com/..."
                                            value={formData.resumeLink}
                                            onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">Cover Note</label>
                                        <textarea
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-600 focus:bg-white outline-none transition-all resize-none"
                                            placeholder="Tell us why you are a great fit..."
                                            value={formData.coverNote}
                                            onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {submitting ? 'Submitting...' : <>Submit Application <Send className="w-4 h-4" /></>}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
