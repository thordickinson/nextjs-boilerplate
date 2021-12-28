import styles from './index.module.scss'


export default function CountersBanner({ counters }) {

    const colors = ['color-red', 'color-blue', 'color-yellow', 'color-green']

    return <section>
        <div className={`container ${styles.counters}`}>
            {counters.map((c, i) => <div key={i} className={styles.counterItem}>
                <div>
                    <i className={`${c.icon} ${colors[i]}`}></i>
                    <h3 className={styles.value}>{c.value}</h3>
                    <h4 className={styles.label}>{c.label}</h4>
                </div>
            </div>)}
        </div>
    </section>
}