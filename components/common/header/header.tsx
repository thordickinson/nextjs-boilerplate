import { signIn, signOut, useSession } from 'next-auth/client'
import { MenuOutlined } from '@ant-design/icons';
import styles from './header.module.scss'

export default interface MenuItem {
    label: string
    url: string
}

export default function HeaderComponent({ links }) {
    const [session, loading] = useSession()
    return <div className={styles.header}>
        <MenuOutlined />
        <span>logo</span>
        <ul className={styles.navMenu}>
            {links.map((l, i) => <li key={i}>
                <a href={l.url}>{l.label}</a>
            </li>)}
        </ul>
        {!session && <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>}
        {session && <>
            Signed in as {session.user.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
        </>}
    </div>
}