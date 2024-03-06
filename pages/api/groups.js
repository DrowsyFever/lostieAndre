import { MongoClient, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://ivomalheirolobo:Lxb2kH0EUoCHeIWH@clusterprime.cdq0wtq.mongodb.net/Users';
const dbName = 'Users';

export default async function handler(req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db(dbName);
        const groupsCollection = db.collection('groups');

        if (req.method === 'POST') {
            const { name, description, members } = req.body;
            const result = await groupsCollection.insertOne({ name, description, members });
            res.status(201).json(result.ops[0]);
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
 