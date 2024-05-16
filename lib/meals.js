import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "fs";
// import { S3 } from "@aws-sdk/client-s3";

// const s3 = new S3({
//   region: "sa-east-1",
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });
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
  const fileName = `${meal.slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Failed to save image!");
    }
  });

  // await s3.putObject({
  //   Bucket: "foodies-bucket",
  //   Key: fileName,
  //   Body: Buffer.from(bufferedImage),
  //   ContentType: meal.image.type,
  // });

  meal.image = fileName;

  db.prepare(
    "INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) VALUES (@creator, @creator_email, @title, @summary, @instructions, @image, @slug)"
  ).run(meal);
}
