import styles from './styles.module.scss'
import Head from 'next/head'
import { Menu } from 'antd';
import { MailOutlined, SettingOutlined, DashboardOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';

import Router, { useRouter } from "next/router"
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import React, { useState, useEffect } from 'react'
import { func } from '@hapi/joi';



const { SubMenu } = Menu;

export default function DashboardLayout({ children }) {

    const year = new Date().getFullYear()
    const [menuCollapsed, setMenuCollapsed] = useState(false)

    const [userstate, setUserstate] = useState(undefined);
    const router = useRouter();
    const [session, status] = useSession();


    const menu = [
        { icon: 'fas fa-tachometer-alt', label: 'Dashboard', link: '/user/dashboard' },
        { icon: 'far fa-id-card', label: 'Profile', link: '/user/profile' },
        {
            icon: 'fas fa-envelope-open-text',
            label: 'Mailbox', link: '/user/mailbox',
            submenu: [
                { label: 'Inbox', link: "/user/mailbox/inbox" },
                { label: 'History', link: "/user/mailbox/history" }
            ]
        }
    ]


    const handleClick = c => {
        console.log('click ', c);
    };


    //effect para la sesion, si cambia la sesion, redirige al Home
    useEffect(() => {
        (async () => {
            const response = await getSession();
            setUserstate(response || null);
        })()
    }, [session]);

    if (userstate === undefined) return null;

    if (!session && !userstate) {
        router.push("/");
        return null;
    }


    //variables para las notificaciones
    const notifyA = 7;
    const notifyB = 0;
   

    return <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
                integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
                crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </Head>
        <main className={styles.layout}>
            <header className={styles.header}>
                <div className={`${styles.logo} ${menuCollapsed ? styles.collapsed : styles.expanded}`}>
                    <a href='/'>
                        {!menuCollapsed && <span>Brand Name</span>}
                        {menuCollapsed && <span>B</span>}
                    </a>
                </div>

                <div className={styles.navBar}>
                    <div className={styles.navBarLeft}>
                        <button className={`clean-button ${styles.menuButton}`} onClick={() => setMenuCollapsed(!menuCollapsed)}>
                            {!menuCollapsed? <i className="fa fa-arrow-left"></i>: <i className="fa fa-arrow-right"></i>}
                        </button>
                    </div>
                    <div className={styles.navBarRight}>
                        <div className={styles.barRightButton}>
                            <i className="fa fa-envelope"></i>
                            {!notifyA? null: <div className={styles.numNot}>
                                <span>{notifyA}</span>
                                </div>}
                        </div>
                        <div className={styles.barRightButton}>
                            <i className="fa fa-bell"></i>
                            {!notifyB? null: <div className={styles.numNot}>
                                <span>{notifyB}</span>
                                </div>}
                        </div>
                        <div className={styles.barRightButton}>
                            <i className="fa fa-cog"></i>
                        </div>
                        <div className={styles.barRightButton} onClick={() => signOut()}>
                            <i className="fa fa-power-off"></i>
                        </div>
                    </div>
                </div>
            </header>
            <div className={styles.dashboard}>
                <div className={styles.menu}>
                    {!menuCollapsed? <div className={styles.avatar}>
                        <img src={session?.user?.image} alt="profilePhoto" width="130" className={styles.photo}/>
                        <div className={styles.userInfo}>
                            <span>Welcome,</span>
                            <h5>{session?.user?.name}</h5>
                        </div>
                        
                    </div>: <div className={styles.avatarSmall}>
                        <img src={session?.user?.image} alt="profilePhoto" width="50" className={styles.photoSmall}/>
                    </div> }

                    <Menu
                        theme="dark"
                        onClick={handleClick}
                        style={{ width: menuCollapsed ? 60 : 256 }}
                        defaultSelectedKeys={[router.pathname]}
                        mode="inline"
                        inlineCollapsed={menuCollapsed}
                        className="navigation-menu"
                    >
                        <Menu.Item icon={<DashboardOutlined />} key="/user/dashboardUser" onClick={() => router.push("/user/dashboardUser")}>Dashboard</Menu.Item>

                        <Menu.Item key="/user/profile" icon={<UserOutlined />} title="My Profile" onClick={() => router.push("/user/profile")}>
                            My Profile
                        </Menu.Item>

                        <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
                            <Menu.Item icon={<MailOutlined />} key="/user/settings/notifications" onClick={() => router.push("/user/settings/notifications")}>Notifications</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>

                        <Menu.Item icon={<LogoutOutlined />} key="sub3" onClick={() => signOut()}> Logout</Menu.Item>
                    </Menu>
                </div>
                <div className={styles.content}>
                    {children}
                    <div className={styles.footer}>
                        <span> Copyright thordickinson@gmail.com {year} </span>
                    </div>
                </div>
            </div>
        </main>
    </>
}