import TitledSection from '../../common/titled-section'
import styles from './index.module.scss'

export default function SidedImageBanner({ title, description, action, backgroundPosition = 'left',
    backgroundImage = undefined, children }) {
    return <TitledSection backgroundPosition={backgroundPosition} backgroundImage={backgroundImage}>
        <div className={styles.elementContainer}>
            <div className={styles.imageContainer}>
                {children}
            </div>
            <div className={styles.informationContainer}>
                <h2>{title}</h2>
                <p>{description}</p>
                <a href={action.link} target={action.target || ''}>
                    {action.label}
                </a>
            </div>
        </div>
    </TitledSection>

}