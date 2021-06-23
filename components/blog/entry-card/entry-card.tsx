import post from '../../../models/post'
import styles from './entry-card.module.scss'
import slugify from 'slugify'

export default function BlogEntryCard({ entry }) {


    const link = `/blog/entries/${entry._id}-${slugify(entry.title)}`

    return <div className={styles.blogEntryCard}>
        <div className={styles.blogThumb}>
            <img src={entry.image} alt={entry.title} />
            <div className={styles.imageOverlay}>
                <span className={styles.category}>
                    {entry.tags.map((t, i) => <a key={i} href={`/blog?tag=t`}>{t}</a>)}
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
