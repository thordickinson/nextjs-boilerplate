import styles from './aside-widget.module.scss';

export default function AsideWidgetComponent({ children, widgetTitle }) {
    return <div className={styles.asideWidget}>
        <h4>{widgetTitle}</h4>
        <div className={styles.content}>
            {children}
        </div>
    </div>
}
