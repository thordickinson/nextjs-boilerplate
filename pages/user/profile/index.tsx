import DashboardCard from '../../../components/dashboard/card'
import CardHeader from '../../../components/dashboard/card-header'
import CounterCard from '../../../components/dashboard/counter-card'
import DashboardTitle from '../../../components/dashboard/title'
import DashboardLayout from '../../../components/layouts/dashboard-layout'
import styles from './styles.module.scss'

export default function UserProfile() {
    return <DashboardLayout>
        <DashboardTitle title="User Profile" breadcrumb={["User", "Profile"]}></DashboardTitle>
        <div>
            <DashboardCard>
                <CardHeader title="Information">
                </CardHeader>
                <div>
                    Hola tarjeta
                </div>
            </DashboardCard>
            <CounterCard label="test" value="1232" icon="fa fa-eye" percent={50}/>
        </div>
    </DashboardLayout>
}