//Para apagar um grupo
import { MongoClient, ObjectId } from 'mongodb';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:3000/api/groups/${params.id}`);
    const group = await res.json();

    const uri = process.env.MONGODB_URI;
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const db = client.db('Users');
    const collection = db.collection('Profiles');
    
    const friendId = await collection.findOne({ _id: ObjectId(params.id) });
    
    client.close();

    return { props: { group, friendId } };
}

export default function Group({ group, friendId }) {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/groups/${group._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/groups/groups');
            } else {
                console.error('Failed to delete group:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleAddFriend = async () => {
        try {
            const response = await fetch(`/api/groups/${group._id}/addFriend/${friendId._id}`, {
                method: 'POST',
            });

            if (response.ok) {
                console.log('Friend added successfully');

            } else {
                console.error('Failed to add friend to group:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>{group.name}</h1>
            <button onClick={handleDelete}>Delete Group</button>
            <button onClick={handleAddFriend}>Add Friend</button>
        </div>
    );
}
