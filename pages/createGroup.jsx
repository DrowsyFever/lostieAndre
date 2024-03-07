import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateGroup() {
    const [name, setName] = useState('');
    const [members, setMembers] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupData = { name, members: members.split(',') };

        try {
            const response = await fetch('/api/groups/groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(groupData),
            });

            if (response.ok) {
                router.push('/groups');
            } 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Create Group</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                {/* <label>
                    Members:
                    <input type="text" value={members} onChange={(e) => setMembers(e.target.value)} />
                </label> */}
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
}
