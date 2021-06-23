import styles from './page-header.module.scss'

export default function PageHeader({ sectionTitle, subtitle = "" }) {
    return <section className={styles['page-header']}>
        <div className="container">
            <div className="page-content text-center">
                <h2>{sectionTitle}</h2>
                <p>{subtitle}</p>
            </div>
        </div>
    </section>
}
