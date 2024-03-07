import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'Users';

export default async function handler(req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db(dbName);
        const groupsCollection = db.collection('groups');

        if (req.method === 'POST') {
            const { name } = req.body;
            const result = await groupsCollection.insertOne({ name });
            if (result.insertedCount === 1) {
                res.status(201).json({ message: 'Group created successfully', group: result.ops[0] });
            } else {
                res.status(500).json({ message: 'Failed to create group' });
            }
        } else if (req.method === 'GET') {
            const groups = await groupsCollection.find().toArray();
            res.status(200).json(groups);
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}
