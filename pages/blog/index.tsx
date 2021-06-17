import { useRouter } from 'next/router'
import { GetStaticPropsResult, GetStaticPropsContext } from 'next'
import DefaultLayout from '../../components/layouts/default-layout'
import styles from "./index.module.scss"
import BlogEntryCard from  '../../components/blog/entry-card/entry-card'


export default function PostList({ posts }) {
    return <DefaultLayout>
        <div className={styles.postList}>
            {posts.content.map(p => <div>
                <BlogEntryCard entry={p}></BlogEntryCard>
            </div>)}
        </div>
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
