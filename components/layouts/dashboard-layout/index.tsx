import styles from './styles.module.scss'

export default function DashboardLayout({children}){
    return <>
    <header>Hola header</header>
    <main className={styles.dashboard}>
        <div className={styles.menu}></div>
        <div className={styles.content}>
            {children}
        </div>
    </main>
    </>
}