import { Request, Response } from 'express';
import Job from '../models/Job';

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response) => {
    try {
        const { category, location, search } = req.query;
        let query: any = {};

        if (category) query.category = category;
        if (location) query.location = location;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req: Request, res: Response) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Admin
export const createJob = async (req: Request, res: Response) => {
    try {
        const { title, company, location, category, description } = req.body;
        if (!title || !company || !location || !category || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Admin
export const deleteJob = async (req: Request, res: Response) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        await job.deleteOne();
        res.status(200).json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
