import Head from 'next/head'
import styles from './styles.module.scss'
import Router from 'next/router'

export default function DashboardTitle({ title, breadcrumb, iconic, link }) {

    if (!Array.isArray(breadcrumb)) breadcrumb = breadcrumb
    const bc = breadcrumb.map(b => typeof (b) == 'string' ? ({ label: b, link: '#' }) : b)

    const router = Router;

    return <div className={styles.dashboardTitle}>
        <Head>
            <title>{title}</title>
        </Head>
        <h3>{title}</h3>

        <div className={styles.breadcrumbContainer}>
            <div>
                <a href={link}><i className={iconic}></i></a>
            </div>
            <ol className={styles.breadcrumb}>
                {bc.map((b, i) => <li key={i}> <a href={b.link}>{b.label}</a></li>)}
            </ol>
        </div>
    </div>
}