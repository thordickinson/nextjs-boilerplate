import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Button, Radio, Space } from 'antd';
import styles from './header.module.scss'
import { useEffect, useState } from 'react';
import LoginButtonComponent from '../login-button/login-button';


export default interface MenuItem {
    label: string
    url: string
}

export default function HeaderComponent({ links }) {
    const [scrolled, setScrolled] = useState(false)
    const [drawerVisible, setDrawerVisible] = useState(false)


    useEffect(() => {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY
            setScrolled(scroll != 0)
        })
    }, [])

    return <>
        <header className={`${styles.navbar} ${scrolled ? styles['navbar-shadow'] : ''}`} id="menuHeader">
            <div className={`${styles.menuContainer} container`}>
                <div className={styles.logoContainer}>
                    <a href="/" className={styles['navbar-brand']}>
                        <img src="img/logo-dark.png" alt="Saasbiz" />
                    </a>
                </div>
                <div className={styles.mainmenu}>
                    <ul className={styles.nav}>
                        {links.map((l, i) => <li key={i}>
                            <a href={l.url}>{l.label}</a>
                        </li>)}
                    </ul>
                </div>
                <div className={styles.loginButtonWrapper}>
                    <LoginButtonComponent></LoginButtonComponent>
                </div>
                <div className={styles.headerRight}>
                    <a className={styles.mainLink}>Main Link</a>
                </div>
                <div className={styles.menuIconContainer}>
                    <button onClick={() => setDrawerVisible(true)}>
                        <MenuOutlined />
                    </button>
                </div>
            </div>
        </header>
        <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={() => setDrawerVisible(false)}
            visible={drawerVisible}
            key="right"
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    </>
}
