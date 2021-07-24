import { GetStaticPropsResult, GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult } from 'next'
import DefaultLayout from '../../../../components/layouts/default-layout';
import PageHeader from '../../../../components/common/page-header/page-header';
import AsideContentSection from '../../../../components/common/aside-content-section/aside-content-section';
import { DateTime } from 'luxon'
import styles from './index.module.scss'
import TagsWidget from '../../../../components/blog/tags-widget/tags-widget';
import RecentPostsWidgets from '../../../../components/blog/recent-widget/recent-widget';

export default function PostEntry({ post, tags, recent }) {
    const aside = <div>
        <TagsWidget tags={tags}></TagsWidget>
        <RecentPostsWidgets recent={recent} currentPost={post}></RecentPostsWidgets>
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
