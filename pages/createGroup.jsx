import { useRouter } from 'next/router';
import { useState } from 'react';

export default function CreateGroup() {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const groupData = { name };

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
            } else {
                console.error('Error:', response.statusText);
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
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
}
