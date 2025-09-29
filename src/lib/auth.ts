"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "./types";
import { getUsers } from "./data";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const users = await getUsers();
  const user = users.find((u) => u.email === email);

  if (user) {
    cookies().set("currentUser", JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });
    redirect("/dashboard");
  } else {
    // In a real app, you'd handle this error more gracefully
    redirect("/login?error=Invalid%20credentials");
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
