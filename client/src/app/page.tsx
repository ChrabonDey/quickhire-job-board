'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import JobCard from '@/components/JobCard';
import { jobService } from '@/services/api';
import { Job } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const companies = [
  { name: 'Vodafone', logo: 'https://img.logo.dev/vodafone.com?token=pk_abc' }, // Using logo.dev as fallback or ui-avatars
  { name: 'Intel', logo: 'https://ui-avatars.com/api/?name=Intel&background=0071C5&color=fff' },
  { name: 'Tesla', logo: 'https://ui-avatars.com/api/?name=Tesla&background=cc0000&color=fff' },
  { name: 'AMD', logo: 'https://ui-avatars.com/api/?name=AMD&background=000&color=fff' },
  { name: 'Talkit', logo: 'https://ui-avatars.com/api/?name=Talkit&background=1D1E25&color=fff' },
];

export default function Home() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtering state
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await jobService.getAll({
          search,
          location,
          category: category === 'Human Resource' ? 'Human Resource' : category // match backend seed
        });
        setFeaturedJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchJobs, 300); // debounce
    return () => clearTimeout(timeoutId);
  }, [search, location, category]);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero
        onSearch={setSearch}
        onLocationChange={setLocation}
      />

      {/* Companies We Helped Grow */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-400 text-lg mb-8">Companies we helped grow</p>
          <div className="flex flex-wrap items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
            {companies.map((company) => (
              <img
                key={company.name}
                src={company.logo}
                alt={company.name}
                className="h-8 md:h-10 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <CategorySection
        activeCategory={category}
        onCategorySelect={setCategory}
      />

      {/* Featured Jobs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[48px] font-bold text-[#1D1E25]">Featured <span className="text-[#2563EB]">jobs</span></h2>
            </div>
            <button className="text-[#4640DE] font-bold text-lg hover:underline flex items-center gap-2">
              Show all jobs <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
              {[1, 2, 4, 8].map((i) => (
                <div key={i} className="h-64 bg-gray-50 rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredJobs.length > 0 ? (
                featuredJobs.slice(0, 8).map((job) => (
                  <Link href={`/jobs/${job._id}`} key={job._id}>
                    <JobCard job={job} />
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-gray-400">
                  No jobs found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#4640DE] rounded-none p-0 relative overflow-hidden flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="flex-1 p-16 lg:p-24">
            <h2 className="text-[56px] font-bold text-white mb-8 leading-tight">
              Start posting <br /> jobs today
            </h2>
            <p className="text-[#CCCCFF] text-xl mb-12 max-w-sm">
              Start posting jobs for only $10.
            </p>
            <button className="px-10 py-5 bg-white text-[#4640DE] font-bold rounded-none hover:bg-gray-50 transition-all shadow-xl active:scale-95 text-lg">
              Sign Up For Free
            </button>
          </div>

          {/* Right Image (Dashboard) */}
          <div className="flex-1 relative w-full h-full min-h-[400px]">
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
              <img
                src="/3.1 Dashboard Company.png"
                alt="Dashboard"
                className="absolute top-10 right-[-100px] w-[120%] max-w-none shadow-2xl rounded-tl-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Jobs Open */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[48px] font-bold text-[#1D1E25]">Latest <span className="text-[#2563EB]">jobs open</span></h2>
            </div>
            <button className="text-[#4640DE] font-bold text-lg hover:underline flex items-center gap-2">
              Show all jobs <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredJobs.slice(0, 8).map((job, idx) => (
              <Link href={`/jobs/${job._id}`} key={`latest-${job._id}-${idx}`}>
                <div className="flex items-center gap-6 p-8 bg-white border border-gray-100 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all cursor-pointer group">
                  <div className="w-16 h-16 bg-white border border-gray-100 rounded-none flex items-center justify-center p-3 shadow-sm group-hover:border-blue-200 transition-colors">
                    <img src={job.logo || `https://ui-avatars.com/api/?name=${job.company}&background=random`} className="w-full h-full object-contain" alt="" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[#1D1E25] mb-1 group-hover:text-blue-600 transition-colors">{job.title}</h4>
                    <p className="text-base text-gray-400">{job.company} • {job.location}</p>
                    <div className="flex gap-3 mt-4">
                      <span className="px-4 py-1 bg-[#EEF2FF] text-[#4640DE] text-sm font-bold rounded-full border border-[#E0E7FF]">{job.type}</span>
                      <div className="w-[1px] h-6 bg-gray-200 self-center"></div>
                      <span className="px-4 py-1 bg-[#F0FDF4] text-[#16A34A] text-sm font-bold rounded-full border border-[#DCFCE7]">{job.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D1E25] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <img src="/Logo.png" alt="QuickHire" className="w-8 h-8 object-contain brightness-0 invert" />
                <span className="text-2xl font-bold text-white">QuickHire</span>
              </div>
              <p className="text-gray-400 text-base leading-relaxed max-w-xs">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-8">About</h5>
              <ul className="space-y-4 text-gray-400 text-base">
                <li><a href="#" className="hover:text-white transition-colors">Companies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Advice</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-8">Resources</h5>
              <ul className="space-y-4 text-gray-400 text-base">
                <li><a href="#" className="hover:text-white transition-colors">Help Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Updates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-bold mb-8">Get job notifications</h5>
              <p className="text-gray-400 text-base mb-8">The latest job news, articles, sent to your inbox weekly.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email Address" className="bg-[#2A2B33] border-none rounded-none px-6 py-4 flex-1 text-base outline-none focus:ring-1 focus:ring-blue-600" />
                <button className="bg-[#4640DE] px-8 py-4 rounded-none text-base font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-500 text-sm">2024 © QuickHire. All rights reserved.</p>
            <div className="flex gap-8 text-gray-500">
              {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a key={social} href="#" className="text-base hover:text-white transition-all transform hover:-translate-y-1">{social}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

