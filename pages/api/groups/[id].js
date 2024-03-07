//Criar grupo
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = "Users";

export default async function handler(req, res) {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    const db = client.db(dbName);
    const groupsCollection = db.collection("groups");

    if (req.method === "POST") {
      const { name, members } = req.body; 
      if (!name || !members || !Array.isArray(members)) {
        res.status(400).json({ error: "Invalid or missing group data" });
        return;
      }

      const membersWithProfile = [];
      for (const memberId of members) {
        const profile = await db.collection("profiles").findOne({ _id: new ObjectId(memberId) });
        if (!profile) {
          res.status(404).json({ error: `Profile with ID ${memberId} not found` });
          return;
        }
        membersWithProfile.push({ name: profile.name, profile });
      }

      const newGroup = {
        name,
        members: membersWithProfile,
      };

      const result = await groupsCollection.insertOne(newGroup);
      if (result.insertedCount === 1) {
        res.status(201).json({ message: "Group created successfully", group: newGroup });
      } else {
        res.status(500).json({ error: "Failed to create group" });
      }
    } else if(req.method === "GET") {
      const id = req.query.id
      if(!id) return res.status(404).json({error: "No id specified in query"})
      const group  = await db.collection("groups").findOne({ _id: new ObjectId(id) });
      //Load group by id
      if(!group) return res.status(404).json({error: "group not found"})
      res.status(200).json({ group });
    }
    
    
    else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
