import style from "./button-apple-store.module.scss"

export default function Button_apple_store() {
    return (
        <div>
            <a
                className={style.appleButton}
                href="#">
                <img src="/img/icons/appleIcon.png" alt="googleplayIcon" />
                <div><span>Download on the</span><p>App Store</p></div>
            </a>
        </div>
    )
}
