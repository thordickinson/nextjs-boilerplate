import styles from './index.module.scss'
import TitledSection from "../../common/titled-section";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RatingComponent from '../../common/rating-component';

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

const truncate = (text: string, maxLength: number) => {
    if (text && text.length > maxLength) return text.substr(0, maxLength - 3) + "..."
    return text
}

export default function TestimonialsBanner({ title, description, testimonials, ssr = true }) {

    return <TitledSection title={title} description={description} backgroundColor='#fef2f4' padding={true}>
        <Carousel responsive={responsive} autoPlay={true} ssr={ssr} infinite={true} autoPlaySpeed={5000} >
            {testimonials.map((t, i) => <div key={i} className={styles.carouselItem}>
                <div className={styles.testimonial}>
                    <div className={styles.avatar}>
                        <img src={t.avatar}></img>
                    </div>
                    <div className={styles.authorInfo}>
                        <h3>{t.authorName}</h3>
                    </div>
                    <div className={styles.rating}>
                        <span>{t.authorTitle}</span>
                        <RatingComponent value={t.rating}></RatingComponent>
                    </div>
                    <p>{truncate(t.text, 140)}</p>
                </div>
            </div>)}
        </Carousel>
    </TitledSection>
}