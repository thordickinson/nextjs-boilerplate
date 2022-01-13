import DashboardLayout from "../../../../components/layouts/dashboard-layout"
import DashboardTitle from "../../../../components/dashboard/title"


export default function Notifications() {
    return (
        <DashboardLayout>
            <DashboardTitle title="Notifications" breadcrumb={["", "Profile"]} iconic="fa fa-home" link="/"></DashboardTitle>
            <div>
                Notificaciones reales...
            </div>
        </DashboardLayout>
    )
}
