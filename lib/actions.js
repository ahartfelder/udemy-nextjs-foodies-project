"use server";

import { redirect } from "next/navigation";
import { createMeal } from "./meals";
import { revalidatePath } from "next/cache";

function validateForm(text) {
  return !text || text.trim() === "";
}

export async function handleForm(prevState, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  };

  if (
    validateForm(meal.creator) ||
    validateForm(meal.title) ||
    validateForm(meal.summary) ||
    validateForm(meal.instructions) ||
    !meal.image ||
    meal.image.size === 0 ||
    !meal.creator_email.includes("@")
  ) {
    return { message: "Please fill out all fields." };
  }

  createMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
