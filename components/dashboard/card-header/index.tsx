import styles from "./styles.module.scss"

export default function CardHeader({title, children = undefined}){
    return <div className={styles.cardHeader}>
        <h4>{title}</h4>
        <div>{children}</div>
    </div>
}