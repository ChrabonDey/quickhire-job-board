import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    type: string; // Full Time, Part Time, etc.
    salary: string;
    logo: string;
    createdAt: Date;
}

const JobSchema: Schema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: 'Full Time' },
    salary: { type: String },
    logo: { type: String },
}, { timestamps: true });

export default mongoose.model<IJob>('Job', JobSchema);
