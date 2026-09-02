import { getJobPostingById, updateJobPosting } from "@/app/actions/jobs.actions";
import { notFound } from "next/navigation";
import JobForm from "../../JobForm";
import { getUser } from "@/lib/dal";

interface EditJobPostingPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditJobPostingPage({ params }: EditJobPostingPageProps) {
  await getUser();
  const { id } = await params;
  const jobId = Number(id);

  if (isNaN(jobId)) {
    notFound();
  }

  const jobPosting = await getJobPostingById(jobId);

  if (!jobPosting) {
    notFound();
  }

  // Bind the jobId to the updateJobPosting action
  const updateJobPostingWithId = updateJobPosting.bind(null, jobId);

  return (
    <JobForm
      mode="edit"
      jobPosting={jobPosting}
      action={updateJobPostingWithId}
    />
  );
}