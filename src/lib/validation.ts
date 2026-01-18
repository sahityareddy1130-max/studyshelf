import { z } from "zod";

// Auth validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" }),
});

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Upload form validation schema
export const uploadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(200, { message: "Title must be less than 200 characters" }),
  author: z
    .string()
    .trim()
    .max(100, { message: "Author name must be less than 100 characters" })
    .optional()
    .or(z.literal("")),
  category: z
    .string()
    .min(1, { message: "Please select a category" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Price must be a positive number",
    })
    .refine((val) => Number(val) <= 10000, {
      message: "Price cannot exceed ₹10,000",
    }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description is required" })
    .min(20, { message: "Description must be at least 20 characters" })
    .max(2000, { message: "Description must be less than 2000 characters" }),
  pages: z
    .string()
    .optional()
    .refine((val) => !val || (!isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 10000), {
      message: "Pages must be a positive number less than 10,000",
    })
    .or(z.literal("")),
});

// Search query sanitization
export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .max(200, { message: "Search query too long" })
    .transform((val) => {
      // Remove potentially dangerous characters while preserving search functionality
      return val.replace(/[<>'";&]/g, '');
    }),
});

// File validation helpers
export const validatePdfFile = (file: File | null): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: "PDF file is required" };
  }
  
  const maxSize = 50 * 1024 * 1024; // 50MB
  if (file.size > maxSize) {
    return { valid: false, error: "PDF file must be less than 50MB" };
  }
  
  if (file.type !== "application/pdf") {
    return { valid: false, error: "Only PDF files are allowed" };
  }
  
  return { valid: true };
};

export const validateImageFile = (file: File | null): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: true }; // Optional field
  }
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return { valid: false, error: "Image must be less than 5MB" };
  }
  
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Only JPEG, PNG, WebP, and GIF images are allowed" };
  }
  
  return { valid: true };
};

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type UploadFormData = z.infer<typeof uploadSchema>;
