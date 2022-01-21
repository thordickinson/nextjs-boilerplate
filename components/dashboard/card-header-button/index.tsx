import styles from './styles.module.scss'

export default function DashboardCardHeaderButton({onClick, iconClass}){
    return <i className={`${styles.iconButton} ${iconClass}`} onClick={onClick}></i>
}