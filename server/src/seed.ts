import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Job from './models/Job';

dotenv.config();

const jobs = [
    {
        title: 'Lead Marketing',
        company: 'Nimbus',
        location: 'Munich, France',
        category: 'Marketing',
        description: 'We are looking for a Lead Marketing to join our team...',
        type: 'Full Time',
        salary: '$50k - $80k',
        logo: '/logos/nimbus.png',
    },
    {
        title: 'Brand Designer',
        company: 'DropBox',
        location: 'San Francisco, USA',
        category: 'Design',
        description: 'Join Dropbox as a Brand Designer...',
        type: 'Full Time',
        salary: '$70k - $100k',
        logo: '/logos/dropbox.png',
    },
    {
        title: 'Interactive Developer',
        company: 'Terraform',
        location: 'Remote',
        category: 'Technology',
        description: 'Build interactive experiences with Terraform...',
        type: 'Full Time',
        salary: '$90k - $120k',
        logo: '/logos/terraform.png',
    },
    {
        title: 'HR Manager',
        company: 'Netlify',
        location: 'Europe, Remote',
        category: 'Human Resource',
        description: 'Manage our amazing team at Netlify...',
        type: 'Full Time',
        salary: '$60k - $90k',
        logo: '/logos/netlify.png',
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/quickhire');
        await Job.deleteMany({});
        await Job.insertMany(jobs);
        console.log('Database Seeded!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
