export interface INavItem {
  id: string;
  text: string;
  href: string;
}

export type TGameFormState = {
  errors?: {
    steamId?: string[]
    name?: string[]
    storePage?: string[]
  }
  message?: string
} | undefined

export type TJobPostingFormState = {
  errors?: {
    title?: string[]
    summary?: string[]
    tags?: string[]
    aboutTheJob?: string[]
    experience?: string[]
    responsibilities?: string[]
    requirements?: string[]
    pluses?: string[]
  }
  message?: string
} | undefined

export interface IJobPosting {
  id: number
  title: string
  summary: string
  tags: string[]
  aboutTheJob: string[]
  experience: string[]
  responsibilities: string[]
  requirements: string[]
  pluses: string[]
  createdAt: Date
  updatedAt: Date
}