import style from "./index.module.scss"

export default function DownloadsBanner({ information, image }) {

    return (
        <div className={style.downloads_banner}>
            <div className={style.container}>
                <div className={style.row}>
                    <div className={style.item}>
                        <h2>{information[0].title}</h2>
                        <p>{information[0].description}</p>
                        <div className={style.buttons}>
                            <a
                                className={style.appleButton}
                                href="#">
                                <img src="/img/icons/appleIcon.png" alt="googleplayIcon" />
                                <div><span>Download on the</span><p>App Store</p></div>
                            </a>
                            <a
                                className={style.googleButton}
                                href="#">
                                <img src="/img/icons/googlePlayIcon.png" alt="googleplayIcon" />
                                <div><span> Get it on</span> <p>Google Play</p></div>
                            </a>
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
