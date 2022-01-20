import { signIn, signOut, useSession } from 'next-auth/client'
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './styles.module.scss'

export default function LoginButtonComponent() {

    const [session, loading] = useSession()

    const username = session?.user?.name?.substr(0, 10) || ''

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


    return <>
        {!session && <>
            <button onClick={() => signIn()} className={`${styles.common} ${styles.loginButton}`}>Sign In</button>
        </>}
        {session && <Dropdown overlay={menu}>
            <a className={`ant-dropdown-link ${styles.common} ${styles.userMenu}`} onClick={e => e.preventDefault()}>
                {username} <DownOutlined />
            </a>
        </Dropdown>
        }
    </>
}
