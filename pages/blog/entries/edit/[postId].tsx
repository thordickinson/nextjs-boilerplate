import { useRouter } from "next/router"
import { useQuery, useQueryClient } from "react-query"
import AsideContentSection from "../../../../components/common/aside-content-section/aside-content-section"
import ImageUpload from "../../../../components/common/image-upload"
import DefaultLayout from "../../../../components/layouts/default-layout"
import { fetchJson } from "../../../../utils/fetch"

interface PostEntry {
}

export default function EditPost({ }: any) {
    const router = useRouter()
    const { postId } = router.query
    const query = useQuery(`PostEntry@${postId}`, fetchJson('/api/blog/posts/{postId}', { postId }))
    if (query.isLoading) return <div>Loading...</div>
    if (query.isError) return <div>Error loading</div>

    const aside = <span></span>

    return <DefaultLayout>
        <AsideContentSection aside={aside}>
            <ImageUpload></ImageUpload>
            <div>
                {JSON.stringify(query.data)}
            </div>
        </AsideContentSection>
    </DefaultLayout>

}