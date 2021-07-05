import { PagedResult } from "../../../utils/pagination"
import styles from './paginator.module.scss'

const maxVisibleCount = 4;

function array(end: number, start: number = 0) {
    const result = []
    for (let i = start; i <= end; i++) result.push(i)
    return result
}

function calculateVisibleElements(currentPage, pageCount): number[] {

    if (pageCount <= maxVisibleCount) {
        return array(pageCount, 1)
    }

    const half = Math.floor(maxVisibleCount / 2)
    console.log(half, currentPage, pageCount)
    const halfStart = currentPage - half
    const halfEnd = currentPage + half
    let start = halfStart
    let end = halfEnd
    if (halfEnd > pageCount) {
        start = pageCount - maxVisibleCount + 1
        end = pageCount
    }
    if (halfStart < 1) {
        start = 1
        end = maxVisibleCount
    }
    if (end - start == maxVisibleCount) {
        start += 1
    }

    const numbers: number[] = []
    for (let i = start; i <= end; i++) {
        numbers.push(i)
    }
    return numbers
}

interface IndexLink {
    index: number
    link: string
}

function buildLinks(baseUri: string, indexes: number[]): IndexLink[] {
    const appendParam = baseUri.indexOf('?') > -1
    return indexes.map(i => ({ index: i, link: `${baseUri}/${i}` }))
}

function buildLink(baseUri: string, i: number) {
    return { index: i, link: `${baseUri}/${i}` }
}

export default function PaginatorComponent({ page, baseLink }) {
    if (!page) return <></>

    const _page: PagedResult<any> = page
    const pageCount = Math.ceil(_page.totalElements / _page.pageSize)
    const indexes = calculateVisibleElements(_page.page, pageCount)
    const links = buildLinks(baseLink, indexes)
    const previous = _page.page > 1 ? buildLink(baseLink, _page.page - 1) : undefined
    const next = _page.page < pageCount ? buildLink(baseLink, _page.page + 1) : undefined
    return <div className={styles.paginator}>
        <ul>
            {previous && <li><a href={previous.link}><i className="fas fa-arrow-left"></i></a></li>}
            {links.map((l, i) => <li key={i}>
                <a href={l.link} className={(_page.page == l.index ? styles.active : '')}>{l.index}</a>
            </li>)}
            {next && <li><a href={next.link}><i className="fas fa-arrow-right"></i></a></li>}
        </ul>
    </div>
}
