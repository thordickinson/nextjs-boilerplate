import style from "./index.module.scss"


export default function Banner_Header({ title, description, hashtag }) {


    return (
        <div className={style.hero}>
            <div className={style.grid}>
                <div className={style.containerTop}>
                    <h4>
                        <i className="fa fa-check">   </i>
                        {hashtag}
                    </h4>
                    <h1>{title}</h1>
                    <p>
                        {description}
                    </p>
                    <div className={style.buttons}>
                        <a href="#" className={`button-big`}>GET STARTED</a>
                        <a href="#" className={`button-media`}><i className="fa fa-play"></i> HOW IT WORKS?</a>
                    </div>
                </div>

                <div className={style.hero_moc}></div>
            </div>
        </div>
    )
}
