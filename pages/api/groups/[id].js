import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = 'Users';

export default async function handler(req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const db = client.db(dbName);
        const groupsCollection = db.collection('groups');
        
        const { id } = req.query;

        if (req.method === 'GET') {
            const group = await groupsCollection.findOne({ _id: new ObjectId(id) });
            if (!group) {
                res.status(404).json({ message: 'Group not found' });
                return;
            }
            res.status(200).json(group);
        } else if (req.method === 'PATCH') {
            const { members } = req.body;
            const result = await groupsCollection.updateOne({ _id: new ObjectId(id) }, { $set: { members } });
            if (result.matchedCount === 0) {
                res.status(404).json({ message: 'Group not found' });
                return;
            }
            res.status(200).json({ message: 'Group updated' });
        } else if (req.method === 'DELETE') {
            const result = await groupsCollection.deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                res.status(404).json({ message: 'Group not found' });
                return;
            }
            res.status(200).json({ message: 'Group deleted' });
        } else {
            res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    } finally {
        await client.close();
    }
}
