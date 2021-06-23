import { useRouter } from 'next/router'
import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsResult, GetStaticPropsContext } from 'next'

export default function PostEntry({ posts }) {
    const router = useRouter();
    const { postId } = router.query;

}

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> {
    const res = await fetch(`${process.env.BACKEND_URL}/api/posts`)
    const post = await res.json()
    return {
        props: { post },
        revalidate: 60 * 60 //1 hour
    }
}
