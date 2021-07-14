import styles from './recent-widget.module.scss'
import AsideWidgetComponent from '../../../components/widgets/aside-widget/aside-widget';

export default function RecentPostsWidgets({recent, currentPost = undefined}) {
    if(!recent) return <></>
    return  <AsideWidgetComponent widgetTitle="Recent Posts">
    <ul>
        {recent && recent.filter(r =>  !currentPost? true : r._id != currentPost._id).map(r => <li key={r._id} 
        className={styles.listItem}>
            <div className={styles.recent}>
                <img src={r.image}></img>
                <a href={`/blog/entries/${r._id}`}>{r.title}</a>
            </div>
        </li>)}
    </ul>
</AsideWidgetComponent>
}
