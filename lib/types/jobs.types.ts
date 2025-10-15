export interface JobPost {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  aboutTheJob: string[];
  experience: string[];
  responsibilities: string[];
  requirements: string[];
  pluses: string[];
  delisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}