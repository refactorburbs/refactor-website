import { createJobPosting } from "@/app/actions";
import JobForm from "../JobForm";
import { getUser } from "@/lib/dal";

export default async function AddNewJobPosting() {
  await getUser();
  return (
    <JobForm
      mode="create"
      action={createJobPosting}
    />
  );
}