export async function getServerSideProps({ params }) {
    const res = await fetch(`http://localhost:3000/api/groups/${params.id}`);
    const group = await res.json();

    return { props: { group } };
}

export default function Group({ group }) {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/groups/${group._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                router.push('/groups');
            } else {
                console.error('Failed to delete group:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
            <button onClick={handleDelete}>Delete Group</button>
        </div>
    );
}
