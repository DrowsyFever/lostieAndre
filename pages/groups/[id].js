import { useRouter } from "next/router"
import { useEffect, useState } from "react";


export default function () {
    const router = useRouter()
    const [groupName, setGroupName] = useState("");

    async function fetchData(id) {
        const res = await fetch(`/api/groups/${id}`);
        if (res.status === 200) {
            const body = await res.json();
            setGroupName(body.group.name);
        } else {
            console.error("Failed to fetch group data");
        }
    }

    useEffect(() => {
        if (router && router.query && router.query.id) {
            fetchData(router.query.id)
        }

    }, [router]);


    return (
        <div>
            {groupName ? groupName : null}
        </div>
    )
}