import * as z from "zod";

// ============================================================
// USER
// ============================================================
export const SignupValidation = z.object({
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const ProfileValidation = z.object({
  file: z.custom<File[]>(),
  username: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email(),
});

// ============================================================
// Message
// ============================================================
export const MessageValidation = z.object({
  content: z.string().min(10, { message: "Minimum 10 characters." }).max(500, { message: "Maximum 500 caracters" }),
});

export const RoomMessageValidation = z.object({
  content: z.string().min(1, { message: "Minimum 1 character." }).max(2200, { message: "Maximum 2,200 caracters" }),
});

// ============================================================
// COMMUNITY
// ============================================================
export const RoomValidation = z.object({
  name: z.string().min(2, { message: "Community's name must be at least 2 characters." }),
  bio: z.string(),
});
