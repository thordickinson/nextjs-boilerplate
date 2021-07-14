import styles from './styles.module.scss'

const centerImage = ''
const leftImage = ''
const rightImage = ''

export default function TitledSection({ title = undefined, description = undefined, padding = false,
    backgroundImage = undefined, backgroundPosition = undefined, children }) {

    const imageUrl = backgroundImage || backgroundPosition == 'center' ? centerImage :
        backgroundPosition == 'left' ? leftImage : backgroundPosition == 'right' ? rightImage : ''

    const bgPosClass = backgroundPosition == 'center' ? styles.centerBackground :
        backgroundPosition == 'right'? styles.rigthBackground : backgroundPosition == 'left'? styles.leftBackground : ''

    const style = imageUrl ? { backgroundImage: `url('${imageUrl}')` } : {}

    return <section className={`${styles.section} ${bgPosClass} ${padding ? styles.padding : ''}`}
        style={style}>
        <div className="container">
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </section>
}