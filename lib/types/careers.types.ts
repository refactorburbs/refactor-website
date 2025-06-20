export interface IJobPost {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  aboutTheJob: string[];
  experience: string[];
  responsibilities: string[];
  requirements: string[];
  pluses: string[];
  createdAt: Date;
  updatedAt: Date;
}