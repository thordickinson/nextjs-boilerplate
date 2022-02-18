import styles from './styles.module.scss'
import Head from 'next/head'
import { Menu } from 'antd';
import { 
    MailOutlined,
    SettingOutlined, 
    DashboardOutlined, 
    UserOutlined, 
    LogoutOutlined, 
    HomeOutlined, 
    SlackOutlined,
    UnlockOutlined
} from '@ant-design/icons';

import Router, { useRouter } from "next/router"
import React, { useState, useEffect } from 'react'
import { func } from '@hapi/joi';
import { Popover, Button, Drawer } from 'antd';
import MenuMobile from '../../dashboard/menuMobile';
import { Auth } from 'aws-amplify';
import { getLogger } from '../../../utils/logging';
import { getUser, logOut } from '../../../utils/auth';
import { toast, ToastContainer } from 'react-toastify';



const { SubMenu } = Menu;
const logger = getLogger("DashboardLayout")

export default function DashboardLayout({ children }) {

    const year = new Date().getFullYear()

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true)
    const router = useRouter();
    const { menuCollapsed: menuCollapsedQueryParam } = router.query
    const [menuCollapsed, setMenuCollapsed] = useState(menuCollapsedQueryParam == "true")
    const [drawerVisible, setDrawerVisible] = useState(false)



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

    //effect para la sesion, si cambia la sesion, redirige al Home
    useEffect(() => {
        (async () => {
            const user = await getUser()
            setUser(user)
            setLoadingUser(false)
        })()
    }, []);

    const handleClick = c => {
        console.log('click ', c);
    };


    const showDrawer = () => {
        setDrawerVisible(true);
    };

    const onClose = () => {
        setDrawerVisible(false);
    };

    const navigate = (url: string) => {
        if (menuCollapsed) {
            url = `${url}?menuCollapsed=true`
        }
        router.push(url)
    }

    const toggleMenuCollapsed = () => {
        const collapsed = !menuCollapsed
        setMenuCollapsed(collapsed)
        router.query.menuCollapsed = `${collapsed}`
        router.push(router)
    }

    const signOut = () => { 
        setLoadingUser(true)
        logOut().then( () => {
            setUser(null)
            router.push("/")
        })
    }



    if (loadingUser) {
        return <>
         <Head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css" />
        </Head>
        <div className={styles.loading}>
            <div className={styles.content}>
                <i className={`${styles.icon} fa fa-atom fa-spin`}></i>
                <span>Please Wait...</span>
            </div>
        </div>
        </>
    }

    
    if (!user) {
        router.replace("/")
    }
    

    //variables para las notificaciones
    const notifyA = 7;
    const notifyB = 0;

    const copyright = `Copyright thordickinson@gmail.com ${year}`;

    const trimUserName = (user: string): string => {
        if (!user) return null
        const first = user.split(" ")[0]
        return first.length > 12 ? first.substring(0, 9) + "..." : first
    }
    const username = user ? trimUserName(user.username) : undefined
    const userImage = user?.picture


    return <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/font-awesome-line-awesome/css/all.min.css" />
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
                    <div className={styles.menuButton} onClick={showDrawer}>
                        <div className={styles.brandIcon}><SlackOutlined /></div>
                        <i className="fa fa-bars"></i>
                    </div>
                    <div className={styles.navBarLeft}>
                        <button className={`clean-button ${styles.menuArrowButton}`} onClick={() => toggleMenuCollapsed()}>
                            {!menuCollapsed ? <i className="fa fa-arrow-left"></i> : <i className="fa fa-arrow-right"></i>}
                        </button>
                    </div>
                    <div className={styles.navBarRight}>
                        <Popover className={styles.barRightButton} content="List Messages" placement="bottomRight" title="Messages" trigger="click">
                            <i className="fa fa-envelope"></i>
                            {!notifyA ? null : <div className={styles.numNot}>
                                <span>{notifyA}</span>
                            </div>}
                        </Popover>
                        <Popover className={styles.barRightButton} content="List Notify" placement="bottomRight" title="Notifications" trigger="click">
                            <i className="fa fa-bell"></i>
                            {!notifyB ? null : <div className={styles.numNot}>
                                <span>{notifyB}</span>
                            </div>}
                        </Popover>
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
                    {!menuCollapsed ? <div className={styles.avatar}>
                        <div className={styles.photoWrapper}>
                            <img src={userImage} alt="Profile photo" className={styles.photo} />
                        </div>
                        <div className={styles.userInfo}>
                            <span>Welcome,</span>
                            <h5>{username}</h5>
                        </div>

                    </div> : <div className={styles.avatarSmall}>
                        <img src={userImage} alt="Profile Photo" className={styles.photoSmall} />
                    </div>}

                    <Drawer title="BrandName" placement="left" onClose={onClose} visible={drawerVisible} >
                        <MenuMobile />
                    </Drawer>

                    <Menu
                        theme="dark"
                        onClick={handleClick}
                        style={{ width: menuCollapsed ? 60 : 256 }}
                        defaultSelectedKeys={[router.pathname]}
                        mode="inline"
                        inlineCollapsed={menuCollapsed}
                        className="navigation-menu"
                    >
                        <Menu.Item icon={<HomeOutlined />} key="/" onClick={() => router.push("/")}>Home</Menu.Item>
                        <Menu.Item icon={<DashboardOutlined />} key="/user/dashboardUser"
                            onClick={() => navigate("/user/dashboardUser")}>Dashboard</Menu.Item>

                        <Menu.Item key="/user/profile" icon={<UserOutlined />} title="My Profile" onClick={() => navigate("/user/profile")}>
                            My Profile
                        </Menu.Item>

                        <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
                            <Menu.Item icon={<MailOutlined />} key="/user/settings/notifications"
                                onClick={() => navigate("/user/settings/notifications")}>Notifications</Menu.Item>
                            <Menu.Item icon={<UnlockOutlined />} key="/user/settings/change-password"
                                onClick={() => navigate("/user/settings/change-password")}>Change Password</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>

                        <Menu.Item icon={<LogoutOutlined />} key="sub3" onClick={() => signOut()}> Logout</Menu.Item>
                    </Menu>
                    {!menuCollapsed ? <div className={styles.footerContainer}>
                        <div className={styles.footer}>
                            <span>{copyright}</span>
                        </div>
                    </div> :
                        <div className={styles.copyrightContainer}>
                            <Popover className={styles.copyrightButton} content={copyright} placement="right" trigger="click">
                                <i className="fa fa-copyright"></i>
                            </Popover>
                        </div>
                    }

                </div>

                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </main>
    </>
}