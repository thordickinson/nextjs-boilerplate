import DashboardLayout from "../../../components/layouts/dashboard-layout"
import DashboardTitle from "../../../components/dashboard/title"
import ChartistGraph from 'react-chartist';
import CounterCard from "../../../components/dashboard/counter-card";
import styles from "./styles.module.scss";
import { HomeOutlined } from '@ant-design/icons';

export default function DashboardUser() {

    //Bar & line values

    var dataLine = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
            [-4, 0, 1, -2, 3, 4, 3, 5, 6, 2, 7, 8]
        ]
    };

    var optionsLine = {
        width: 800,
        height: 300,
        high: 8,
        low: -5,
        axisX: {
            labelInterpolationFnc: function (value, index) {
                return index % 1 === 0 ? value : null;
            }
        },
        axisY: {
            labelInterpolationFnc: function (value, index) {
                return index % 1 === 0 ? value : null;
            }
        }
    };



    return (
        <DashboardLayout>


            <DashboardTitle title="Dashboard" breadcrumb={["", "Dashboard"]} iconic="fa fa-home" link="/"></DashboardTitle >
            <div className={styles.container}>
                <div className={styles.back}>
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

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h3>Title Graph</h3>
                        <ChartistGraph data={dataLine} options={optionsLine} type="Line" />
                    </div>
                    <div className={styles.topProducts}>
                        Top products...
                    </div>

                </div>
                <div className={styles.module}>
                    Active Order...
                </div>
                
            </div>



        </DashboardLayout >
    )
}
