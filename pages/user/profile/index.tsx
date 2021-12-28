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
            <DashboardTitle title={session?.user?.name} breadcrumb={["User", "Profile"]}></DashboardTitle>
            <img src={session?.user?.image} alt="profilePhoto" />
            <div>
                <DashboardCard>
                    <CardHeader title="Information">
                    </CardHeader>
                    <div>
                        <span>
                            E-mail: {session?.user?.email}
                        </span>

                    </div>
                </DashboardCard>
                <CounterCard label="test" value="1254" icon="fa fa-eye" percent={50} />
            </div>
        </DashboardLayout>
    )
}