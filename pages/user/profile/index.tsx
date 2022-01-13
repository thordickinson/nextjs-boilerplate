import DashboardCard from '../../../components/dashboard/card'
import CardHeader from '../../../components/dashboard/card-header'
import CounterCard from '../../../components/dashboard/counter-card'
import DashboardTitle from '../../../components/dashboard/title'
import DashboardLayout from '../../../components/layouts/dashboard-layout'
import styles from './styles.module.scss'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import React, { useState, useEffect } from 'react'

export default function UserProfile() {

    const [session, loading] = useSession();


    return (

        <DashboardLayout>
            <DashboardTitle title={session?.user?.name} breadcrumb={["", "Profile"]} iconic="fa fa-home" link="/"></DashboardTitle>

            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.leftside}>
                        <div className={styles.profilePhoto}>
                            <img src={session?.user?.image} alt="profilePhoto" />
                            <span>{session?.user?.name}</span>
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