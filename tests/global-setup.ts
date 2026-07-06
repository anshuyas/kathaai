import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../kathaai-backend/.env") });

async function globalSetup() {
  const uri = process.env.MONGO_URI_TEST as string;

  if (!uri) {
    throw new Error("MONGO_URI_TEST not found — check the dotenv path in global-setup.ts");
  }

  await mongoose.connect(uri);

  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Failed to get database handle after connecting");
  }

  const collections = await db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }

  console.log(`Test database wiped before E2E run (${collections.length} collections cleared).`);

  await mongoose.connection.close();
}

export default globalSetup;