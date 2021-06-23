import { useRouter } from 'next/router'
import { GetStaticPropsResult, GetStaticPropsContext } from 'next'
import DefaultLayout from '../../components/layouts/default-layout'
import BlogEntryCard from  '../../components/blog/entry-card/entry-card'
import PageHeader from '../../components/common/page-header/page-header'
import AsideContentSection from '../../components/common/aside-content-section/aside-content-section'
import styles from "./index.module.scss"


export default function PostList({ posts }) {
    const asideContent = <div>Hola aside</div>
    return <DefaultLayout>
        <PageHeader sectionTitle="Blog" subtitle="This is the subtitle of the blog" ></PageHeader>
        <AsideContentSection aside={asideContent}>
            <div className={styles.postList}>
                {posts.content.map(p => <div key={p._id} className={styles.entryCard}>
                    <BlogEntryCard entry={p}></BlogEntryCard>
                </div>)}
            </div>
        </AsideContentSection>
    </DefaultLayout>

}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts`)
    const posts = await res.json()
    return {
        props: { posts },
        revalidate: 60 * 60 //1 hour
    }
}
