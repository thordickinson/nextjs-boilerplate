import DashboardLayout from "../../../components/layouts/dashboard-layout"
import DashboardTitle from "../../../components/dashboard/title"
import ChartistGraph from 'react-chartist';

export default function DashboardUser() {

    //donut values
    const data = {
        labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'],
        series: [20, 10, 30, 40, 10, 15, 6]
    };

    var options = {
        donut: true,
        donutWidth: 100,
        startAngle: 263,
        total: 150,
        height: 400,
        chartPadding: 30,
        labelOffset: 60,
        labelDirection: 'explode'
    };

    return (
        <DashboardLayout>
            <DashboardTitle title="Dashboard User" breadcrumb={["User", "Profile"]}></DashboardTitle>
            <div>
                <ChartistGraph className=".ct-chart" data={data} options={options} type="Pie" />
            </div>
        </DashboardLayout>
    )
}
