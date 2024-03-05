import clientPromise from "../../lib/mongodb";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const qrCodeValue = req.body['qrCodeValue'];

    if (!qrCodeValue) {
      return res.status(400).json({ error: "QR Code value cannot be empty" });
    }

    const client = await clientPromise;
    const db = client.db("Users");

    try {
      await db.collection("qrcodes").insertOne({ value: qrCodeValue });

      res.status(201).json({ message: "QR Code stored successfully" });
    } catch (error) {
      console.error("Error storing QR Code:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.redirect("/");
  }
}
