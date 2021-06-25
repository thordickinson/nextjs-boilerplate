import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsResult, GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult } from 'next'
import DefaultLayout from '../../../components/layouts/default-layout';
import PageHeader from '../../../components/common/page-header/page-header';
import AsideContentSection from '../../../components/common/aside-content-section/aside-content-section';
import styles from './[postId].module.scss'

export default function PostEntry({ post }) {
    const aside = <div>Aside content</div>
    return <DefaultLayout>
        <PageHeader sectionTitle={post.title} subtitle={post.summary}></PageHeader>
        <AsideContentSection aside={aside}>
            <img src={post.image} alt={post.title}></img>
            <div className={styles.metadata}>
                <div>
                    <i className="fa fa-user"></i>
                    HOLI
                </div>
                <div>
                    <i className="fa fa-calendar"></i>
                    MUNDI
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </AsideContentSection>
    </DefaultLayout>
}

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const params = new URLSearchParams({ select: '_id', sort: '-createdAt', limit: '30' })
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts?${params}`)
    const { content } = await res.json()
    const paths = content.map(c => ({ params: { postId: c._id } }))
    return { paths, fallback: "blocking" }

}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    let { postId } = ctx.params
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`)
    if (res.status == 404) {
        return { notFound: true }
    }
    const post = await res.json()
    return {
        props: { post },
        revalidate: 60 * 60 //1 hour
    }
}
