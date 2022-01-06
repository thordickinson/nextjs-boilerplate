import React from 'react';
import { Menu } from 'antd';
import Router, { useRouter } from "next/router";
import { MailOutlined, SettingOutlined, DashboardOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import styles from "./styles.module.scss";

export default function MenuMobile() {
    const { SubMenu } = Menu;

    const handleClick = c => {
        console.log('click ', c);
    };

    const router = useRouter();

    return (
        <div>
            <Menu
                theme="dark"
                onClick={handleClick}
                style={{ width: 230 }}
                defaultSelectedKeys={[router.pathname]}
                mode="inline"
                className= {`${styles.mobileMenu} ${"navigation-menu"}`}
                 >
                    <Menu.Item icon={<DashboardOutlined />} key="/user/dashboardUser" onClick={() => router.push("/user/dashboardUser")}>Dashboard</Menu.Item>

                    <Menu.Item 
                        key="/user/profile" 
                        icon={<UserOutlined />} 
                        title="My Profile" 
                        onClick={() => router.push("/user/profile")}
                    >
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
    )
}
