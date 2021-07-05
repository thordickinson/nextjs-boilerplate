import post from '../../../models/blog/post'
import styles from './entry-card.module.scss'

export default function BlogEntryCard({ entry }) {


    const link = `/blog/entries/${entry._id}`
    const tag = entry.tags && entry.tags.length > 0? entry.tags[0] : undefined
    return <div className={styles.blogEntryCard}>
        <div className={styles.blogThumb}>
            <img src={entry.image} alt={entry.title} />
            <div className={styles.imageOverlay}>
                <span className={styles.category}>
                    {tag && <a href={`/blog?tag=${tag}`}>{tag}</a>}
                </span>
            </div>
        </div>
        <div className={styles.entryContent}>
            <h3><a href={link}>{entry.title}</a></h3>
            <p>{entry.summary}</p>
            <a href={link} className={styles.readMore}>Read More</a>
        </div>
    </div>
}
