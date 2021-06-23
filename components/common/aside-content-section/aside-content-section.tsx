import styles from './aside-content-section.module.scss';

export default function AsideContentSection({ children, aside }) {
    return <section className={`${styles.asideContentSection} padding`}>
        <div className={`container ${styles.contentWrapper}`}>
            <div className={styles.mainContent}>{children}</div>
            <aside className={styles.asideContent}>{aside}</aside>
        </div>
    </section>
}
