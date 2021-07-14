import TitledSection from '../../common/titled-section'
import styles from './index.module.scss'

export default function FeaturesBanner({ title, description, features }) {
    const colors = [styles.red, styles.blue, styles.green]

    return <TitledSection title={title} description={description} padding={true}>
        <div className={styles.featuresContainer}>
            {features.map((feature, index) =>
                <div key={index} className={`${styles.featureWrapper} ${colors[index]} ${index == 1 ? styles.active : ''}`}>
                    <div className={styles.feature}>
                        <i className={`${feature.icon || 'fas fa-brain'}`}></i>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                </div>)}
        </div>
    </TitledSection>
}