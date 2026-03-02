import express from 'express';
import { submitApplication, getApplications } from '../controllers/applicationController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
    .post(submitApplication)
    .get(protect, admin, getApplications);

export default router;
