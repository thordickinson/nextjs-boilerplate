import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsResult, GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult } from 'next'
import DefaultLayout from '../../../components/layouts/default-layout';
import PageHeader from '../../../components/common/page-header/page-header';
import AsideContentSection from '../../../components/common/aside-content-section/aside-content-section';
import { DateTime } from 'luxon'
import styles from './[postId].module.scss'
import AsideWidgetComponent from '../../../components/widgets/aside-widget/aside-widget';

export default function PostEntry({ post, tags, recent }) {
    const aside = <div>
        <AsideWidgetComponent widgetTitle="Categories">
            <ul>
                {tags && tags.map(t => <li key={t.key}>
                    <a className={styles.tagLink} href={`/blog?tag=${t.key}`}>{t.label}</a>
                </li>)}
            </ul>
        </AsideWidgetComponent>
        <AsideWidgetComponent widgetTitle="Recent Posts">
            <ul>
                {recent && recent.filter(r => r._id != post._id).map(r => <li key={r._id}>
                    <div className={styles.recent}>
                        <img src={r.image}></img>
                        <a href={`/blog/entries/${r._id}`}>{r.title}</a>
                    </div>
                </li>)}
            </ul>
        </AsideWidgetComponent>
    </div>
    const date = DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED);
    return <DefaultLayout>
        <PageHeader sectionTitle={post.title} subtitle={post.summary}></PageHeader>
        <AsideContentSection aside={aside}>
            <img src={post.image} alt={post.title}></img>
            <div className={styles.metadata}>
                <div>
                    <i className="fa fa-user"></i>
                    {post.author}
                </div>
                <div>
                    <i className="fa fa-calendar"></i>
                    {date}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </AsideContentSection>
    </DefaultLayout>
}

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const params = new URLSearchParams({ select: '_id', sort: '-createdAt', limit: '30' })
    const res = await fetch(`${process.env.BACKEND_URL}/api/blog/posts?${params}`)
    const { content } = await res.json()
    const paths = content.map(c => ({ params: { postId: c._id } }))
    return { paths, fallback: "blocking" }
}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    let { postId } = ctx.params
    const postResponse = await fetch(`${process.env.BACKEND_URL}/api/blog/posts/${postId}`)
    if (postResponse.status == 404) {
        return { notFound: true }
    }
    const post = await postResponse.json()

    const tagsResponse = await fetch(`${process.env.BACKEND_URL}/api/blog/tags`)
    const tagPage = await tagsResponse.json()
    const tags = tagPage.content

    const recentResponse = await fetch(`${process.env.BACKEND_URL}/api/blog/posts?sort=-creacion&limit=4`)
    const recentPage = await recentResponse.json()
    const recent = recentPage.content

    return {
        props: { post, tags, recent },
        revalidate: 60 * 60 //1 hour
    }
}
