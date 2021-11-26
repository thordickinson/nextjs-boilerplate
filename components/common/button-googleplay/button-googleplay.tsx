import style from "./button-googleplay.module.scss"

export default function Button_googleplay() {
    return (
        <div>
            <a
                className={style.googleButton}
                href="#">
                <img src="/img/icons/googlePlayIcon.png" alt="googleplayIcon" />
                <div><span> Get it on</span> <p>Google Play</p></div>
            </a>
        </div>
    )
}
