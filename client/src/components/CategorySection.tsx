import { Palette, BarChart, Megaphone, DollarSign, Monitor, Settings, Briefcase, Users } from 'lucide-react';

const categories = [
    { name: 'Design', jobs: '235 jobs available', icon: Palette, color: 'text-[#4640DE]', bg: 'bg-white' },
    { name: 'Sales', jobs: '756 jobs available', icon: BarChart, color: 'text-[#4640DE]', bg: 'bg-white' },
    { name: 'Marketing', jobs: '140 jobs available', icon: Megaphone, color: 'text-white', bg: 'bg-[#4640DE]', active: true },
    { name: 'Finance', jobs: '325 jobs available', icon: DollarSign, color: 'text-[#4640DE]', bg: 'bg-white' },
    { name: 'Technology', jobs: '435 jobs available', icon: Monitor, color: 'text-[#4640DE]', bg: 'bg-white' },
    { name: 'Engineering', jobs: '542 jobs available', icon: Settings, color: 'text-[#4640DE]', bg: 'bg-white' },
    { name: 'Business', jobs: '211 jobs available', icon: Briefcase, color: 'text-[#4640DE]', bg: 'bg-white' },
    { name: 'Human Resource', jobs: '346 jobs available', icon: Users, color: 'text-[#4640DE]', bg: 'bg-white' },
];

interface CategorySectionProps {
    activeCategory: string;
    onCategorySelect: (category: string) => void;
}

const CategorySection = ({ activeCategory, onCategorySelect }: CategorySectionProps) => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <h2 className="text-[32px] sm:text-[48px] font-bold text-[#1D1E25] leading-tight">Explore by <span className="text-[#2563EB]">category</span></h2>
                    </div>
                    <button
                        onClick={() => onCategorySelect('')}
                        className="text-[#4640DE] font-bold text-lg hover:underline flex items-center gap-2"
                    >
                        Show all jobs <span className="text-2xl">→</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.name;
                        return (
                            <div
                                key={cat.name}
                                onClick={() => onCategorySelect(isActive ? '' : cat.name)}
                                className={`p-10 border transition-all cursor-pointer group rounded-none h-full flex flex-col justify-between ${isActive
                                    ? 'bg-[#4640DE] border-[#4640DE] shadow-2xl shadow-blue-100'
                                    : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]'
                                    }`}
                            >
                                <div>
                                    <div className={`w-12 h-12 mb-8 transition-transform group-hover:scale-110 flex items-center justify-start ${isActive ? 'text-white' : 'text-[#4640DE]'}`}>
                                        <cat.icon className="w-10 h-10" />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-3 ${isActive ? 'text-white' : 'text-[#1D1E25]'}`}>{cat.name}</h3>
                                    <div className="flex items-center gap-4">
                                        <p className={`text-lg font-medium ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>{cat.jobs}</p>
                                        <span className={`text-xl ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-blue-600'}`}>→</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;

