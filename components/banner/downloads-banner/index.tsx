import style from "./index.module.scss"
import Button_apple_store from "../../common/button-apple-store/button-apple-store"
import Button_googleplay from "../../common/button-googleplay/button-googleplay"

export default function DownloadsBanner({ information, image }) {

    return (
        <div className={style.downloads_banner}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.item}>
                        <h2>{information[0].title}</h2>
                        <p>{information[0].description}</p>
                        <div className={style.buttons}>
                            <Button_apple_store></Button_apple_store>
                            <Button_googleplay></Button_googleplay>
                        </div>
                    </div>
                    <div className={style.item}>
                        <img src={image} alt="content-2 image" />
                    </div>
                </div>
            </div>
        </div>
    )
}
