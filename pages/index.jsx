import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import Scanner from '../components/scanner';
import Generate from '../components/generator';
import CreateGroup from './createGroup';
import FooterNavbar from '../components/navbar';

export default function HomePage({ username }) {
    return (
        <Layout pageTitle="Home">
            {username ?
                <>
                    <h2 className="welcomeText">Welcome {username}!</h2>
                    <h3>Select a festival:</h3>
                    <button>Primavera Sound Porto</button><br /><br />
                    <Link href="/profile">Profile</Link><br /><bcr />
                    <Link href="/api/logout">Log Out</Link><br />
                    <Link href="/groups">Groups</Link>
                    {/* <Scanner /> */}
                    {/* <Generate /> */}
                    <CreateGroup />
                    
                </> :
                <>
                    <h2>Lostie</h2>
                    <Link href="/login">Log In</Link><br />
                    <Link href="/signup">Sign Up</Link>
                </>
            }
            <FooterNavbar/>
        </Layout>
        
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined) {
        username = false;
    }
    return { props: { username } };
};
