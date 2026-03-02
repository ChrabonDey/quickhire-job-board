export interface Job {
    _id: string;
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    type: string;
    salary: string;
    logo?: string;
    createdAt: string;
}

export interface Application {
    _id: string;
    jobId: string | Job;
    name: string;
    email: string;
    resumeLink: string;
    coverNote: string;
    createdAt: string;
}
