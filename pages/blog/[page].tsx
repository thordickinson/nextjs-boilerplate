import { useRouter } from 'next/router'
import { GetStaticPropsResult, GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult } from 'next'
import DefaultLayout from '../../components/layouts/default-layout'
import BlogEntryCard from '../../components/blog/entry-card/entry-card'
import PageHeader from '../../components/common/page-header/page-header'
import AsideContentSection from '../../components/common/aside-content-section/aside-content-section'
import styles from "./[page].module.scss"
import PaginatorComponent from '../../components/common/paginator/paginator'
import { PagedResult } from '../../utils/pagination'
import TagsWidget from '../../components/blog/tags-widget/tags-widget'
import RecentPostsWidgets from '../../components/blog/recent-widget/recent-widget'


const PAGE_SIZE = 6
const REVALIDATION = 60 * 60 //1 hour

export default function PostList({ posts, tags, recent }) {
    const asideContent = <div>
        <TagsWidget tags={tags}></TagsWidget>
        <RecentPostsWidgets recent={recent}></RecentPostsWidgets>
    </div>
    return <DefaultLayout>
        <PageHeader sectionTitle="Blog" subtitle="This is the subtitle of the blog" ></PageHeader>
        <AsideContentSection aside={asideContent}>
            <div className={styles.postList}>
                {posts.content.map(p => <div key={p._id} className={styles.entryCard}>
                    <BlogEntryCard entry={p}></BlogEntryCard>
                </div>)}
            </div>
            <PaginatorComponent baseLink="/blog" page={posts}></PaginatorComponent>
        </AsideContentSection>
    </DefaultLayout>

}

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/blog/posts?limit=1`)
    const response: PagedResult<any> = await res.json()
    const pageCount = Math.ceil(response.totalElements / PAGE_SIZE)
    const paths = []
    for (let i = 0; i < pageCount; i++) paths.push({ params: { page: `${(i + 1)}` } })
    return {
        paths,
        fallback: 'blocking'
    }
}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const { page = 1 } = ctx.params || {}
    const res = await fetch(`${process.env.BACKEND_URL}/api/blog/posts?limit=6&sort=-createdAt&page=${page}`)
    const posts = await res.json()

    const tagsResponse = await fetch(`${process.env.BACKEND_URL}/api/blog/tags`)
    const tagPage = await tagsResponse.json()
    const tags = tagPage.content

    const recentResponse = await fetch(`${process.env.BACKEND_URL}/api/blog/posts?sort=-creacion&limit=4`)
    const recentPage = await recentResponse.json()
    const recent = recentPage.content

    return {
        props: { posts, tags, recent },
        revalidate: REVALIDATION 
    }
}
