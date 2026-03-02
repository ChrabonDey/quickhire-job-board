import { MapPin } from 'lucide-react';
import { Job } from '../types';

interface JobCardProps {
    job: Job;
}

const tagColors: Record<string, string> = {
    'Marketing': 'bg-[#FFF9F2] text-[#FFB836] border-[#FFFAEB]',
    'Design': 'bg-[#F0FDF4] text-[#26A4FF] border-[#E0F2FE]', // Actually design looks bluish in one, greenish in another. Let's stick to Design=Teal/Blue
    'Business': 'bg-[#FDF2FF] text-[#4640DE] border-[#F5F3FF]',
    'Technology': 'bg-[#FFF2F2] text-[#FF4545] border-[#FEE2E2]',
};

const JobCard = ({ job }: JobCardProps) => {
    return (
        <div className="bg-white p-8 border border-gray-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center p-1.5 shadow-sm group-hover:border-blue-300 transition-all scale-100 group-hover:scale-105">
                    <img src={job.logo || `https://ui-avatars.com/api/?name=${job.company}&background=random`} alt={job.company} className="w-full h-full object-contain" />
                </div>
                <span className="px-4 py-1 bg-white text-[#4640DE] text-sm font-bold border border-[#4640DE]">
                    {job.type}
                </span>
            </div>

            <h3 className="text-2xl font-bold text-[#1D1E25] group-hover:text-[#4640DE] transition-colors mb-2">
                {job.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-400 mb-6 text-lg">
                <span>{job.company}</span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{job.location}</span>
                </div>
            </div>

            <p className="text-gray-500 mb-8 line-clamp-2 text-base leading-relaxed">
                {job.description || `${job.company} is looking for ${job.title} to join their team in ${job.location}...`}
            </p>

            <div className="mt-auto flex flex-wrap gap-3">
                {[job.category, job.type].map((tag) => (
                    <span
                        key={`${job._id}-${tag}`}
                        className={`px-4 py-1.5 text-xs font-bold rounded-full border ${tagColors[tag] || 'bg-gray-50 text-gray-500 border-gray-100'}`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default JobCard;

