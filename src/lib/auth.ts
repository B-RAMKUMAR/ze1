"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "./types";
import { getUsers } from "./data";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export async function login(data: unknown): Promise<{ error: string } | { success: true }> {
  const validation = loginSchema.safeParse(data);
  if (!validation.success) {
    return { error: "Invalid data format." };
  }

  const { email, password } = validation.data;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const users = await getUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (user && user.password === password) {
    // Omit password from the cookie
    const { password: _password, ...userToStore } = user;
    
    cookies().set("currentUser", JSON.stringify(userToStore), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    // Redirect on success
    redirect("/dashboard");
  } else {
    return { error: "Invalid email or password." };
  }
}

export async function logout() {
  cookies().delete("currentUser");
  redirect("/login");
}

export async function getCurrentUser(): Promise<User | null> {
  const userCookie = cookies().get("currentUser")?.value;
  if (userCookie) {
    try {
      return JSON.parse(userCookie) as User;
    } catch (e) {
      return null;
    }
  }
  return null;
}
