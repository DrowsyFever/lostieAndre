import { useRouter } from "next/router"
import { useEffect } from "react";

export default function() {
    const router = useRouter()

    async function fetchData(id) {
        const res = await fetch(`/api/groups/${id}`)
        if (res.status === 200) {
            const body = await res.json()
            console.log(body)
        }
    }
    useEffect(() => {
        if(router && router.query && router.query.id) {
            fetchData(router.query.id)
        } 
        
    }, [router]);


    return (
        <div>
            AHUAHFASFOIASF
        </div>
    )
}