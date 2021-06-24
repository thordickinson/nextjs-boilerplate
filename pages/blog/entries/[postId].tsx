import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsResult, GetStaticPropsContext, GetStaticPathsContext, GetStaticPathsResult } from 'next'
import DefaultLayout from '../../../components/layouts/default-layout';

export default function PostEntry({ post }) {
    const router = useRouter();
    return <DefaultLayout>
        {post.title}
    </DefaultLayout>
}

export async function getStaticPaths(ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> {
    const params = new URLSearchParams({ select: '_id', sort: '-createdAt', limit: '30' })
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts?${params}`)
    const { content } = await res.json()
    const paths = content.map(c => ({ params: { postId: c._id } }))
    return {
        paths,
        fallback: true
    }

}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    let { postId } = ctx.params
    const idx = postId.indexOf('-')
    if (idx > 0) {
        postId = (postId as string).substring(idx)
    }
    console.log(postId)
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts/${postId}`)
    if (res.status == 404) {
        return { notFound: true }
    }
    const post = await res.json()
    console.log(post)
    return {
        props: { post },
        revalidate: 60 * 60 //1 hour
    }
}
