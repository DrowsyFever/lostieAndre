import Link from "next/link";

export async function getServerSideProps() {
    const res = await fetch('http://localhost:3000/api/groups/groups');
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
                        <Link href={`/groups/${group._id}`}>{group.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href="/">Home</Link><br/>
        </div>
    );
}
