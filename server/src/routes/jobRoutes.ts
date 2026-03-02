import express from 'express';
import { getJobs, getJobById, createJob, deleteJob } from '../controllers/jobController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .get(getJobs)
    .post(protect, admin, createJob);

router.route('/:id')
    .get(getJobById)
    .delete(protect, admin, deleteJob);

export default router;
