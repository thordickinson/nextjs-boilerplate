import Dragger from "antd/lib/upload/Dragger";

const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log("File:", info.file, info.fileList);
        }
        if (status === 'done') {
            console.log(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            console.log(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function ImageUpload({ currentUrl = null, imageUploaded = null }) {
    return <div>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <i className="fas fa-upload"></i>
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </Dragger>
    </div>
}