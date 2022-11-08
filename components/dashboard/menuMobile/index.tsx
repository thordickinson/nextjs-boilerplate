import React, {useState, useEffect} from 'react';
import { Menu } from 'antd';
import Router, { useRouter } from "next/router";
import { 
    MailOutlined, 
    SettingOutlined, 
    DashboardOutlined, 
    UserOutlined, 
    LogoutOutlined, 
    BookOutlined, 
    LoginOutlined, 
    TeamOutlined,
    DollarOutlined,
    FolderViewOutlined,
    ContactsOutlined,
    HomeOutlined
} from '@ant-design/icons';
import styles from "./styles.module.scss";
import { getUser, logOut } from '../../../utils/auth';

export default function MenuMobile() {
    const { SubMenu } = Menu;
    const router = useRouter();
    const year = new Date().getFullYear();
    const copyright = `Copyright thordickinson@gmail.com ${year}`;
    const [userstate, setUserstate] = useState(undefined);
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true)


    const handleClick = c => {
        console.log('click ', c);
    };

    //effect para la sesion, si cambia la sesion, redirige al Home
    useEffect(() => {
        (async () => {
            const user = await getUser()
            setUser(user)
            setLoadingUser(false)
        })()
    }, []);

    const signOut = () => { 
        setLoadingUser(true)
        logOut().then( () => {
            setUser(null)
            router.push("/")
        })
    }

    const signIn = () => {
        const redirectTo = encodeURIComponent(router.pathname) + encodeURIComponent(window.location.search)
        router.push(`/user/login?redirectTo=${redirectTo}`)
    }

    return (
      <div>
        <Menu
          theme="dark"
          onClick={handleClick}
          style={{ width: 230 }}
          defaultSelectedKeys={[router.pathname]}
          mode="inline"
          className="navigation-menu mobile-menu"
        >
          <Menu.Item
            icon={<HomeOutlined />}
            key="/"
            onClick={() => router.replace("/")}
          >
            Home
          </Menu.Item>
          <Menu.Item
            icon={<TeamOutlined />}
            key="/about-us"
            onClick={() => router.replace("/about-us")}
          >
            About Us
          </Menu.Item>
          <Menu.Item
            icon={<DollarOutlined />}
            key="/pricing"
            onClick={() => router.replace("/pricing")}
          >
            Pricing
          </Menu.Item>
          <Menu.Item
            icon={<FolderViewOutlined />}
            key="/showcase"
            onClick={() => router.replace("/showcase")}
          >
            ShowCase
          </Menu.Item>
          <Menu.Item
            icon={<ContactsOutlined />}
            key="/contact-us"
            onClick={() => router.replace("/contact-us")}
          >
            Contact
          </Menu.Item>
          {user ? (
            <Menu.Item
              icon={<DashboardOutlined />}
              key="/user/dashboard"
              onClick={() => router.replace("/user/dashboard")}
            >
              Dashboard
            </Menu.Item>
          ) : null}

          {user ? (
            <Menu.Item
              key="/user/profile"
              icon={<UserOutlined />}
              title="My Profile"
              onClick={() => router.replace("/user/profile")}
            >
              My Profile
            </Menu.Item>
          ) : null}
          {user ? (
            <Menu.Item
              key="/blog"
              icon={<BookOutlined />}
              title="Blog"
              onClick={() => router.replace("/blog")}
            >
              Blog
            </Menu.Item>
          ) : null}
          {user ? (
            <SubMenu key="sub2" icon={<SettingOutlined />} title="Settings">
              <Menu.Item
                icon={<MailOutlined />}
                key="/user/settings/notifications"
                onClick={() => router.replace("/user/settings/notifications")}
              >
                Notifications
              </Menu.Item>
              <Menu.Item key="10">Option 10</Menu.Item>
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          ) : null}

          {user ? (
            <Menu.Item
              icon={<LogoutOutlined />}
              key="sub3"
              onClick={() => signOut()}
            >
              {" "}
              Logout
            </Menu.Item>
          ) : null}
          {!user ? (
            <Menu.Item
              icon={<LoginOutlined />}
              key="sub4"
              onClick={() => signIn()}
            >
              {" "}
              Login
            </Menu.Item>
          ) : null}
        </Menu>
        <div className={styles.footerContainer}>
          <div className={styles.footer}>
            <span>{copyright}</span>
          </div>
        </div>
      </div>
    );
}
