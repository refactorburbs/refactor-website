export type SessionPayload = {
  userId: string
  expiresAt: Date
};

export interface Credentials {
  github: {
    email: string;
    password: string;
  }
  prisma: {
    email: string;
    password: string;
  }
  pinata: {
    email: string;
    password: string;
  }
  emailjs: {
    email: string;
    password: string;
  }
}