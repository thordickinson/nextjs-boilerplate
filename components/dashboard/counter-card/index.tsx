import { Progress } from 'antd'
import DashboardCard from '../card'
import styles from './styles.module.scss'

export default function CounterCard({ label, value, percent = -1, icon }) {
    return <DashboardCard>
        <div className={styles.counterCard}>
            <div className={styles.icon}>
                <i className={icon}></i>
            </div>
            <div className={styles.label} >{label}</div>
            <div className={styles.value}>
                ${value}
            </div>
            {percent > -1 &&
                <div className={styles.progress}>
                    <Progress percent={percent} showInfo={false} />
                </div>
            }
            <span>{percent}% compared to last week</span>
        </div>
    </DashboardCard>
}