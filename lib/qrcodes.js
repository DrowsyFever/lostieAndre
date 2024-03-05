import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { value } = req.body;

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db(process.env.MONGODB_URI);
    const collection = db.collection("qrcodes");

    await collection.insertOne({ value });

    res.status(201).json({ message: "QR Code stored successfully" });
  } catch (error) {
    console.error("Error storing QR Code:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
