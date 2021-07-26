import styles from './styles.module.scss'

export default function FormField({label, children, message = undefined}){
    return <div className={styles.formField}>
        <label>{label}</label>
        <div>
            {children}
        </div>
        <div className={`${styles.message}`}>
        
        </div>
    </div>
}