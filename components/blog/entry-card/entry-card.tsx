import styles from './entry-card.module.scss'

export default function BlogEntryCard({entry}){
    return <div className={styles.entryCard}>
        {entry.title}
        {entry.createdBy}
    </div>
}
