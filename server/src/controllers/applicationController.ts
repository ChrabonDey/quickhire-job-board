import { Request, Response } from 'express';
import Application from '../models/Application';

// @desc    Submit job application
// @route   POST /api/applications
// @access  Public
export const submitApplication = async (req: Request, res: Response) => {
    try {
        const { jobId, name, email, resumeLink, coverNote } = req.body;

        if (!jobId || !name || !email || !resumeLink || !coverNote) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        try {
            new URL(resumeLink);
        } catch (_) {
            return res.status(400).json({ message: 'Invalid resume link URL' });
        }

        const application = await Application.create({
            jobId,
            name,
            email,
            resumeLink,
            coverNote,
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error });
    }
};

// @desc    Get applications (Internal/Admin)
// @route   GET /api/applications
// @access  Admin
export const getApplications = async (req: Request, res: Response) => {
    try {
        const applications = await Application.find().populate('jobId', 'title company').sort({ createdAt: -1 });
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
