import { signIn, signOut, useSession } from 'next-auth/client'
import { MenuOutlined } from '@ant-design/icons';
import styles from './header.module.scss'
import { useEffect, useState } from 'react';

export default interface MenuItem {
    label: string
    url: string
}

export default function HeaderComponent({ links }) {
    const [session, loading] = useSession()
    const [scrolled, setScrolled] = useState(false)


    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY
            setScrolled(scroll != 0)
        })
    }, [])

    return <header className={`${styles.navbar} ${scrolled? styles['navbar-shadow'] : ''}`} id="menuHeader">
        <div className={`${styles.menuContainer} container`}>
            <MenuOutlined />
            <a href="index.html" className={styles['navbar-brand']}>
                <img src="img/logo-dark.png" alt="Saasbiz" />
            </a>
            <div className={styles.mainmenu}>
                <ul className={styles.nav}>
                    {links.map((l, i) => <li key={i}>
                        <a href={l.url}>{l.label}</a>
                    </li>)}
                </ul>
            </div>
            {!session && <>
                <button onClick={() => signIn()}>Sign in</button>
            </>}
            {session && <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>}
            <div className={styles.headerRight}>
                <a className={styles.mainLink}>Main Link</a>
            </div>
        </div>
    </header>
}
