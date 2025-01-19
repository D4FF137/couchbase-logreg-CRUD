import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import { couchbase } from "./config.mjs";
import couchbaseSDK from "couchbase";

const app = express();
app.use(bodyParser.json());

async function connectToCouchbase() {
  try {
    const cluster = await couchbaseSDK.connect(couchbase.connectionString, {
      username: couchbase.username,
      password: couchbase.password,
    });
    const bucket = cluster.bucket(couchbase.bucketName);
    const collection = bucket.defaultCollection();
    app.set("collection", collection);
    console.log("Connected to Couchbase");
  } catch (error) {
    console.error("Failed to connect to Couchbase:", error);
    process.exit(1);
  }
}

connectToCouchbase();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});