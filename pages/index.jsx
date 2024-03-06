import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import Scanner from '../components/scanner';
import Generate from '../components/generator';
import CreateGroup from './createGroup';
import Groups from './groups';
import { useState, useEffect } from 'react';

export default function HomePage( {username} ) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/groups');
                if (response.ok) {
                    const data = await response.json();
                    setGroups(data);
                } else {
                    console.error('Failed to fetch groups data');
                }
            } catch (error) {
                console.error('Error fetching groups data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout pageTitle="Home">
        {username ?
        <>
            <h2 className="welcomeText">Welcome {username}!</h2>
            <h3>Select a festival:</h3>
            <button>Primavera Sound Porto</button><br/><br/>
            <Link href="/profile">Profile</Link><br/><bcr/>
            <Link href="/api/logout">Log Out</Link>
            <Scanner/>         
            <Generate/>
            <CreateGroup/>
            <Groups groups={groups}/>
        </>: 
        <>
            <h2>Lostie</h2>
            <Link href="/login">Log In</Link><br/>
            <Link href="/signup">Sign Up</Link>
        </>
        }
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    return { props: {username} };
};