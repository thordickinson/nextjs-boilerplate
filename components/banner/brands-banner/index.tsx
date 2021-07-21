import styles from './index.module.scss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
        slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    }
};

export default function BrandsBanner({ logos, ssr = true }) {
    return <section className={styles.section}>
        <div className={`container`}>
            <Carousel responsive={responsive} autoPlay={true} ssr={ssr} infinite={true} autoPlaySpeed={4000}
                removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}>
                {logos.map((l, i) => <div  key={i} className={styles.carouselItem}> <img key={i} src={l}></img> </div>)}
            </Carousel>
        </div>
    </section>
}