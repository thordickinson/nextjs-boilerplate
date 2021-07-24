import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it'
import styles from './styles.module.scss'

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});
const mdParser = new MarkdownIt(/* Markdown-it options */);

export default function MarkdownEditor({ content, setContent = undefined }) {
    const onChange = (c) => { if (setContent) { setContent(c.text) } }
    return <MdEditor className={styles.editor} style={{ height: '500px' }} value={content}
        renderHTML={text => mdParser.render(text)} onChange={onChange} />;
}