"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "./types";
import { getUsers } from "./data";

export async function login(formData: FormData): Promise<{ error: string } | void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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
  } else {
    return { error: "Invalid email or password." };
  }
  
  redirect("/dashboard");
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
