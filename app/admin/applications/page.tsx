import { getJobPostingsForDropdownFilter } from "@/app/actions/jobs.actions";
import { getAllJobApplications } from "@/app/actions/applications.actions";
import JobApplicationsList from "./JobApplicationsList";
import { getUser } from "@/lib/dal";

export default async function JobApplications() {
  await getUser();

  const [applications, jobPostings] = await Promise.all([
    getAllJobApplications(),
    getJobPostingsForDropdownFilter()
  ]);

  return (
    <JobApplicationsList
      applications={applications}
      jobPostings={jobPostings}
    />
  );
}