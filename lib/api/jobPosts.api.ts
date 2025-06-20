import prisma from "../prisma";
import { JobPost } from "../types/jobs.types";

async function getJobPosts(): Promise<JobPost[]> {
  // Since there will never be THAT many job posts, just fetch them all
  // at once and do pagination on the frontend.
  const jobPosts = await prisma.jobPosting.findMany();
  return jobPosts;
}

export {
  getJobPosts
}