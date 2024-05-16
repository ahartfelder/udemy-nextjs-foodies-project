"use server";

import { redirect } from "next/navigation";
import { createMeal } from "./meals";

function validateForm(text) {
  return !text || text.trim() === "";
}

export async function handleForm(formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (Object.values(meal).some(validateForm)) {
    throw new Error("Please fill out all fields.");
  }

  createMeal(meal);
  redirect("/meals");
}
