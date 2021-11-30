import style from "./index.module.scss"
import TitledSection from "../../common/titled-section"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

export default function Banner_ScreenShots({ titleBanner, descBanner, screenshots, ssr = true }) {

    return (
        <div className={style.container}>
            <TitledSection
                title={titleBanner}
                description={descBanner}>
                <div className={style.carousel}>
                    <Carousel responsive={responsive} autoPlay={true} ssr={ssr} infinite={true} autoPlaySpeed={3000}>
                        {screenshots.map((t, i) => <div key={i} className={style.carouselItem}>
                            <div className={style.frame}>
                                <div className={style.screenshot}>
                                    <img src={t.shot}></img>
                                </div>
                            </div>
                        </div>)}
                    </Carousel>
                </div>
            </TitledSection>
        </div>
    )
}
