import sql from "better-sqlite3";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  throw new Error("Fetching meals failed!");
  const stmt = db.prepare("SELECT * FROM meals");
  return stmt.all();
}
