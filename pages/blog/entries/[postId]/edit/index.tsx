import { useRouter } from "next/router"
import { useQuery } from "react-query"
import AsideContentSection from "../../../../../components/common/aside-content-section/aside-content-section"
import ImageUpload from "../../../../../components/common/image-upload"
import DefaultLayout from "../../../../../components/layouts/default-layout"
import { fetchJson } from "../../../../../utils/fetch"
import { useEffect, useState } from "react"
import MarkdownEditor from "../../../../../components/common/markdown-editor"

interface PostEntry {
}

export default function EditPost({ }: any) {
    const router = useRouter()

    const { postId } = router.query
    const query = useQuery(`PostEntry@${postId}`, fetchJson('/api/blog/posts/{postId}', { postId }))
    const [content, setContent] = useState()
    useEffect(() => setContent(query.data?.content), [query.data])
    const aside = <span></span>

    if (typeof (window) == 'undefined' || query.isLoading) return <div>Loading...</div>
    if (query.isError) return <div>Error loading</div>

    const saveChanges = () => console.log()

    return <DefaultLayout>
        <AsideContentSection aside={aside}>
            <ImageUpload></ImageUpload>
            <MarkdownEditor content={content} setContent={setContent}></MarkdownEditor>
            <div>
                <button className="button button-primary" onClick={saveChanges}>Save Changes</button>
            </div>
        </AsideContentSection>
    </DefaultLayout>

}