export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/groups');
    const groups = await res.json();

    return { props: { groups } };
}

export default function Groups({ groups }) {
    return (
        <div>
            <h1>Groups</h1>
            <ul>
                {groups.map((group) => (
                    <li key={group._id}>
                        <a href={`/group/${group._id}`}>{group.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
