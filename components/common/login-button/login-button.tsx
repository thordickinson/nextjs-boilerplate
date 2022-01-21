import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.module.scss'
import { useState, useEffect } from 'react';
import { getLogger } from '../../../utils/logging';
import { getUser, logOut } from '../../../utils/auth';
import { useRouter } from 'next/router';

const logger = getLogger("LoginButton")

export default function LoginButtonComponent() {

    const [user, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const router = useRouter()

    useEffect(() => {
        (async () => {
            const user = await getUser()
            setUser(user)
            setLoadingUser(false)
        })()
    }, [])

    const username = user?.username?.substr(0, 15) || ''

    const signOut = () => {
        logOut().then( u => setUser(null)).catch()
    } 

    const onMenuClick = ({ key }) => {
        if (key == 'logout') signOut();
    }

    const menu = <Menu onClick={onMenuClick}>
        <Menu.Item key="0">
            <a href="/user/dashboardUser">Dashboard</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="/user/profile">Profile</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>

    const logIn = () => {
        const redirectTo = encodeURIComponent(router.pathname) + encodeURIComponent(window.location.search)
        router.push(`/user/login?redirectTo=${redirectTo}`)
    }


    return <>
        {!user && <>
            <button onClick={logIn} className={`${styles.common} ${styles.loginButton}`}>Enter</button>
        </>}
        {user && <Dropdown overlay={menu}>
            <a className={`ant-dropdown-link ${styles.common} ${styles.userMenu}`} onClick={e => e.preventDefault()}>
                {username} <DownOutlined />
            </a>
        </Dropdown>
        }
    </>
}
