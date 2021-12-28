import Head from 'next/head'
import styles from './styles.module.scss'

export default function DashboardTitle({title, breadcrumb}){

    if(!Array.isArray(breadcrumb)) breadcrumb = breadcrumb
    const bc = breadcrumb.map(b => typeof(b) == 'string'? ({label: b, link: '#'}): b) 

    return <div className={styles.dashboardTitle}>
        <Head>
            <title>{title} profile</title>
        </Head>
        <h3>{title}</h3>
        <div className={styles.breadcrumbContainer}>
            <ol className={styles.breadcrumb}>
                {bc.map((b, i) => <li key={i}> <a href={b.link}>{b.label}</a></li>)}
            </ol>
        </div>
    </div>
}