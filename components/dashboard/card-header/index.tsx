import styles from "./styles.module.scss"

export default function DashboardCardHeader({title, children = undefined}){
    return <div className={styles.cardHeader}>
        <div className={styles.title}>
            <h4>{title}</h4>
        </div>
        <div className={styles.controls}>
            {children}
        </div>
    </div>
}