import fs from "node:fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  // throw new Error("Fetching meals failed!");
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}

export function getMeal(slug) {
  const stmt = db.prepare("SELECT * FROM meals WHERE slug = ?");
  return stmt.get(slug);
}

export async function createMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `/images/${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public${fileName}`);
  const buffer = await meal.image.arrayBuffer();
  stream.write(Buffer.from(buffer), (error) => {
    if (error) {
      throw new Error("Failed to save image!");
    }
  });

  meal.image = fileName;

  db.prepare(
    "INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) VALUES (@creator, @creator_email, @title, @summary, @instructions, @image, @slug)"
  ).run(meal);
}
