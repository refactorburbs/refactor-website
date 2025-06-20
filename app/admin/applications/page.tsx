import { getAllJobApplications, getJobPostingsForDropdownFilter } from "@/app/actions";
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