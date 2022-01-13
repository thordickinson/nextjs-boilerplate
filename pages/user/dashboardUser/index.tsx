import DashboardLayout from "../../../components/layouts/dashboard-layout"
import DashboardTitle from "../../../components/dashboard/title"
import ChartistGraph from 'react-chartist';
import CounterCard from "../../../components/dashboard/counter-card";
import styles from "./styles.module.scss";
import { HomeOutlined } from '@ant-design/icons';

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


            <DashboardTitle title="Dashboard" breadcrumb={["", "Dashboard"]} iconic="fa fa-home" link="/"></DashboardTitle >
            <div className={styles.container}>
                <div className={styles.back}>
                    <div className={styles.clearfix}>
                        <div className={styles.row}>
                            <div className={styles.object}>
                                <CounterCard label="Earnings" value="4500" icon="fa fa-bolt" percent={50} />
                            </div>
                            <div className={styles.object}>
                                <CounterCard label="Sales" value="1254" icon="fa fa-bullseye" percent={50} />
                            </div>
                            <div className={styles.object}>
                                <CounterCard label="Orders" value="10" icon="fa fa-cart-plus" percent={10} />
                            </div>
                            <div className={styles.object}>
                                <CounterCard label="Views" value="3000" icon="fa fa-eye" percent={50} />
                            </div>
                        </div>
                    </div>
                </div>


                <div>
                    <ChartistGraph className=".ct-chart" data={data} options={options} type="Pie" />
                </div>
            </div>



        </DashboardLayout >
    )
}
