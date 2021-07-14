import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import AsideWidgetComponent from '../../../components/widgets/aside-widget/aside-widget';
import styles from './tags-widget.module.scss'


export default function TagsWidget({ tags }) {
    return <AsideWidgetComponent widgetTitle="Categories">
        <ul>
            {tags && tags.map(t => <li key={t.key} className={styles.listItem}>
                <a className={styles.tagLink} href={`/blog?tag=${t.key}`}>{t.label}</a>
            </li>)}
        </ul>
    </AsideWidgetComponent>
}
