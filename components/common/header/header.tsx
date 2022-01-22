import { MenuOutlined } from '@ant-design/icons';
import { Drawer, Button, Radio, Space } from 'antd';
import styles from './header.module.scss'
import { useEffect, useState } from 'react';
import LoginButtonComponent from '../login-button/login-button';
import MenuMobile from '../../dashboard/menuMobile';
import { SlackOutlined } from '@ant-design/icons';
import { enablePushNotifications } from '../../../utils/serviceworker';

export default interface MenuItem {
    label: string
    url: string
}

export default function HeaderComponent({ links }) {
    const [scrolled, setScrolled] = useState(false);
    const scrollListener = () => setScrolled(window.scrollY != 0);

    const [visible, setVisible] = useState(false);


    useEffect(() => {
        window.addEventListener('scroll', scrollListener)
        return () => window.removeEventListener('scroll', scrollListener)

    }, [])

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleMainLinkClick = () => {
        (async () => {
            await enablePushNotifications()
        })()
    }

    //dentro del logo container el link que habia direccionaba al home, este generaba el error
    //al tocar el drawer por fuera para cerrarlo, lo dejo en # para que no genere el fallo
    return <>
        <header className={`${styles.navbar} ${scrolled ? styles['navbar-shadow'] : ''}`} id="menuHeader">
            <div className={`${styles.menuContainer} container`}>
                <div className={styles.menuIconContainer}>
                    <a onClick={showDrawer} >
                        <i className="fa fa-bars"></i>
                    </a>
                </div>
                <div className={styles.logoContainer}>
                    <a href="#" className={styles['navbar-brand']}>
                        <img src="/img/logo-dark.png" alt="Saasbiz" />
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
                    <a className={styles.mainLink} onClick={handleMainLinkClick}>Main Link</a>
                </div>
            </div>
        </header>
        <Drawer title="BrandName" placement="left" onClose={onClose} visible={visible}>
            <MenuMobile />
        </Drawer>
    </>
}
