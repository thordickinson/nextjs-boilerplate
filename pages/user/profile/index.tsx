import DashboardTitle from '../../../components/dashboard/title'
import DashboardLayout from '../../../components/layouts/dashboard-layout'
import styles from './styles.module.scss'
import React, { useState, useEffect } from 'react'
import DashboardCard from '../../../components/dashboard/card'
import { getUser } from '../../../utils/auth'
import DashboardCardHeader from '../../../components/dashboard/card-header'
import DashboardCardHeaderButton from '../../../components/dashboard/card-header-button'

export default function UserProfile() {

    const [user, setUser] = useState(null);
    useEffect(() => {
        (async () => {
            const u = await getUser()
            setUser(u)
        })()
    }, [])


    return (
        <DashboardLayout>
            <DashboardTitle title={user?.username} breadcrumb={["", "Profile"]} iconic="fa fa-home" link="/"></DashboardTitle>
            <div style={{'display':'flex'}}>
                <DashboardCard>
                    <DashboardCardHeader title="Hola mundo">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                    </DashboardCardHeader>
                    <div>Hi</div>
                </DashboardCard>

                <DashboardCard>
                    <DashboardCardHeader title="Hola mundo">
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                        <DashboardCardHeaderButton iconClass="fa fa-bell" onClick={() => console.log("done")}/>
                    </DashboardCardHeader>
                    <div>Hi</div>
                </DashboardCard>
            </div>

        </DashboardLayout >
    )
}