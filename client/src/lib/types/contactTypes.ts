// src/lib/types/contactTypes.ts

export type Contact = {
  id: number;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  createdAt: string;
  viewed: boolean;
};

export type InsertContact = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};
