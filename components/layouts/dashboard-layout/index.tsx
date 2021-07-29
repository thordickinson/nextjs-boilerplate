import styles from './styles.module.scss'
import Head from 'next/head'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
const { SubMenu } = Menu;

export default function DashboardLayout({ children }) {
    const year = new Date().getFullYear()

    const [menuCollapsed, setMenuCollapsed] = useState(false)

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

    const handleClick = e => {
        console.log('click ', e);
    };

    return <>
        <Head>
            <title>My Awesome App</title>
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
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                    <div className={styles.navBarRight}>
                        User menu
                    </div>
                </div>
            </header>
            <div className={styles.dashboard}>
                <div className={styles.menu}>
                    <Menu
                        theme="dark"
                        onClick={handleClick}
                        style={{ width: menuCollapsed ? 60 : 256 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        inlineCollapsed={menuCollapsed}
                    >
                        <Menu.Item icon={<MailOutlined />} key="5">Option 5</Menu.Item>
                        <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                        </SubMenu>
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                            <Menu.Item key="6">Option 6</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div className={styles.content}>
                    {children}
                    <div className={styles.footer}>
                        Copyright thordickinson@gmail.com {year}
                    </div>
                </div>
            </div>
        </main>
    </>
}