import styles from './styles.module.scss'

const centerImage = ''
const leftImage = ''
const rightImage = ''

export default function TitledSection({ title = undefined, description = undefined, padding = false, backgroundColor = 'transparent',
    backgroundImage = undefined, backgroundPosition = undefined, children }) {

    const imageUrl = backgroundImage || backgroundPosition == 'center' ? centerImage :
        backgroundPosition == 'left' ? leftImage : backgroundPosition == 'right' ? rightImage : ''

    const bgPosClass = backgroundPosition == 'center' ? styles.centeredBackground :
        backgroundPosition == 'right' ? styles.rigthBackground : backgroundPosition == 'left' ? styles.leftBackground : ''

    const style: any = { backgroundColor }
    if (imageUrl) style.backgroundImage = `url('${imageUrl}')`

    return <section className={`${styles.section}  ${bgPosClass} ${padding ? styles.padding : ''}`}
        style={style}>
        <div className="container">
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <div className={styles.descriptionContainer}>
                <p className={styles.description}>{description}</p> </div>}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </section>
}