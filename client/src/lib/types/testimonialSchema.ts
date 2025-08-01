// src/lib/schemas/testimonialSchema.ts

export type Testimonial = {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  imageUrl: string;
  rating: number;
};
