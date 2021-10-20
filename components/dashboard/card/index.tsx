import styles from "./styles.module.scss"

export default function DashboardCard({children}){
    return <div className={styles.dashboardCard}>
        {children}
    </div>
}