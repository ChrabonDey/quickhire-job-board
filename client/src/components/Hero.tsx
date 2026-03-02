import { Search, MapPin } from 'lucide-react';

interface HeroProps {
    onSearch: (value: string) => void;
    onLocationChange: (value: string) => void;
}

const Hero = ({ onSearch, onLocationChange }: HeroProps) => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-white">
            {/* Background Geometric Pattern */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-blue-600">
                    <path d="M100 0 L100 100 L0 100 Z" fill="currentColor" />
                    <path d="M80 0 L100 0 L100 20 Z" fill="currentColor" opacity="0.5" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-bold text-[#1D1E25] leading-[1.1] mb-8">
                            Discover <br />
                            more than <br />
                            <span className="text-[#2563EB] relative inline-block">
                                5000+ Jobs
                                <svg className="absolute -bottom-2 sm:-bottom-4 left-0 w-full" viewBox="0 0 240 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 9.5C40.5 4.5 140.5 2 238.5 9.5" stroke="#2563EB" strokeWidth="6" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>
                        <p className="text-xl text-gray-500 mb-12 max-w-xl leading-relaxed">
                            Great platform for the job seeker that searching for new career heights and passionate about startups.
                        </p>

                        <div className="bg-white p-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col md:flex-row items-center gap-2 max-w-[700px]">
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-100 w-full">
                                <Search className="w-6 h-6 text-gray-900" />
                                <input
                                    type="text"
                                    placeholder="Job title or keyword"
                                    className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400 text-lg font-medium"
                                    onChange={(e) => onSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex-1 flex items-center gap-3 px-4 py-3 w-full relative">
                                <MapPin className="w-6 h-6 text-gray-900" />
                                <select
                                    className="w-full bg-transparent outline-none text-gray-900 appearance-none cursor-pointer text-lg font-medium pr-8"
                                    onChange={(e) => onLocationChange(e.target.value)}
                                >
                                    <option value="">Anywhere</option>
                                    <option value="Remote">Remote</option>
                                    <option value="USA">USA</option>
                                    <option value="UK">UK</option>
                                    <option value="Europe">Europe</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L6 6L11 1" stroke="#1D1E25" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <button className="w-full md:w-auto px-10 py-4 bg-[#4640DE] text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-md active:scale-95 whitespace-nowrap">
                                Search my job
                            </button>
                        </div>
                        <p className="mt-6 text-base text-gray-500">
                            <span className="font-bold opacity-60">Popular :</span> UI Designer, UX Researcher, Android, Admin
                        </p>
                    </div>

                    <div className="flex-1 relative">
                        <div className="relative w-full max-w-[550px] mx-auto">
                            {/* Geometric lines effect around the image */}
                            <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-full h-full border-[1px] border-blue-100 rounded-[2rem] -z-10"></div>
                            <div className="absolute top-0 right-0 -translate-y-6 translate-x-6 w-full h-full border-[1px] border-blue-50 rounded-[2rem] -z-10"></div>

                            <img
                                src="/Banner.png"
                                alt="Job seeker"
                                className="relative z-10 w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

