import DashboardTitle from '../../../components/dashboard/title'
import DashboardLayout from '../../../components/layouts/dashboard-layout'
import styles from './styles.module.scss'
import React, { useState, useEffect } from 'react'
import { getUser } from '../../../utils/auth'

export default function UserProfile() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        (async() => {
            const u = await getUser()
            setUser(u)
        })()
    }, [])


    return (
        <DashboardLayout>
            <DashboardTitle title={user?.username} breadcrumb={["", "Profile"]} iconic="fa fa-home" link="/"></DashboardTitle>

            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.leftside}>
                        <div className={styles.profilePhoto}>
                            <img src={user?.picture} alt="profilePhoto" />
                            <span>{user?.username}</span>
                        </div>
                        <div className={styles.infoProfile}>
                            info profile
                        </div>
                    </div>

                    <div className={styles.rightside}>
                        <div className={styles.overview}>
                            overview & settings
                        </div>
                        <div className={styles.events}>
                            <div className={styles.event}>
                                event 1
                            </div>
                            <div className={styles.event}>
                                event 2
                            </div>
                            <div className={styles.event}>
                                event 3
                            </div>
                            <div className={styles.event}>
                                event 4
                            </div>
                        </div>
                        <div className={styles.icons}>
                            icons
                        </div>
                    </div>
                </div>
            </div>

        </DashboardLayout >
    )
}