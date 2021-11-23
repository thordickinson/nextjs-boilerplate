import DefaultLayout from '../../components/layouts/default-layout';
import CountersBanner from '../../components/banner/counters-banner';
import TestimonialsBanner from '../../components/banner/testimonials-banner';
import TeamBanner from '../../components/banner/team-banner';
import SidedImageBanner from '../../components/banner/sided-image-banner';
import style from "./styles.module.scss";

export default function AboutUs() {

    const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const randWord = (length: number) => {
        let word = ""
        for (var i = 0; i < length; i++) word += LETTERS.charAt(Math.round(Math.random() * LETTERS.length))
        return word
    }

    const randText = (wordCount: number) => {
        let words = ""
        for (let i = 0; i < wordCount; i++) words += ` ` + randWord(Math.round(Math.random() * 10))
        return words
    }

    const counters = [
        { icon: 'fa fa-download', label: 'Total downloaded', value: 2345 },
        { icon: 'fa fa-chart-bar', label: 'Grow on Year', value: 6543 },
        { icon: 'fa fa-star', label: 'Client Reviews', value: 3453 },
        { icon: 'fa fa-bookmark', label: 'People subscribed', value: 3453 }
    ]

    const text30 = "coOB ba wGwVSUN IsjTjopjf jTeELsH DueQMvQJR p c Q UdxUuo SdUtKQbG wSfQvzita " +
        "VWEVlmEB ZXnDd w SyWNNq OfrxoTK PfjymhpLju Ld qa TZMtQGAX uvUGbzVPe QVVQ LVU zypvH IQmWTp"

    const testimonials = [
        { avatar: '/img/testi-1.jpg', authorName: 'Eldie Goldey', authorTitle: 'Developer', rating: 4, text: randText(30) },
        { avatar: '/img/testi-2.jpg', authorName: 'Peter Scenzency', authorTitle: 'Designer', rating: 3, text: randText(30) },
        { avatar: '/img/testi-3.jpg', authorName: 'Fiorella Ibanez', authorTitle: 'Marketer', rating: 4, text: randText(30) },
        { avatar: '/img/testi-1.jpg', authorName: 'Laura Fies', authorTitle: 'Architect', rating: 5, text: randText(30) },
        { avatar: '/img/testi-2.jpg', authorName: 'Ivan Prince', authorTitle: 'Singer', rating: 4, text: randText(30) },
        { avatar: '/img/testi-3.jpg', authorName: 'Michael Thomanson', authorTitle: 'Developer', rating: 5, text: randText(30) }
    ]

    const members = [
        { photo: '/img/team/team-1.png', name: 'Fiorella Ibañez', position: 'Designer' },
        { photo: '/img/team/team-2.png', name: 'nombre2 apellido2', position: 'cargo' },
        { photo: '/img/team/team-3.png', name: 'nombre3 apellido3', position: 'Cargo' },
        { photo: '/img/team/team-4.png', name: 'nombre4 apellido4', position: 'CARGO' }
    ]

    const description1 = "We provide marketing services to startups and small businesses to looking for a partner of their digital media, design & development, lead generation.";

    return (
        <DefaultLayout>
            <section className={style.container}>
                <div className={style.bannerAbout}>
                    <h2>Know More About Us</h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Illo iusto laborum eligendi odit! Deserunt dolor eos architecto maxime.
                        Quas blanditiis praesentium minus perferendis provident? Nostrum
                        doloremque quos laudantium labore odio.
                    </p>
                </div>
            </section> {/*seccion banner about us*/}

            <SidedImageBanner backgroundPosition="right" title="The #1 Tool For Creating Stunning Marketing"
                description={description1}
                action={{ link: '#', label: 'SEE PRICING', target: '_blank' }}>
                <img style={{ padding: "0 30px" }} src="/img/dashboard-2.png"></img>
            </SidedImageBanner>

            <SidedImageBanner backgroundPosition="left" title="The #1 Tool For Creating Stunning Marketing"
                description={description1}
                action={{ link: '#', label: 'SEE PRICING', target: '_blank' }}>
                <img style={{ width: "700px", padding: "0 30px" }} src="/img/dashboard-1.png"></img>
            </SidedImageBanner>

            {/* 
            <section className={style.productsSection}>
                <div className={style.gridItems}>

                    <div className={`${style["product_text"]} ${style["obj1"]}`}>
                        <h2>The #1 Tool For Creating</h2>
                        <h2>Stunning Marketing</h2>

                        <p>
                            We provide marketing services to startups and small
                            businesses to looking for a partner of their digital media,
                            design & development, lead generation.
                        </p>
                        <p>
                            It is a long established fact that a reader will be distract
                            ed by the readable content of a page when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using and content here.
                        </p>
                        <button className={style.button}>see pricing</button>
                    </div>

                    <div className={`${style["product_image"]} ${style["obj2"]}`}>
                        <img src="/img/dashboard-2.png"></img>
                    </div>

                    <div className={`${style["product_image"]} ${style["obj3"]}`}>
                        <img src="/img/dashboard-1.png"></img>
                    </div>

                    <div className={`${style["product_text"]} ${style["obj4"]}`}>
                        <h2>The #1 Tool For Creating</h2>
                        <h2>Stunning Marketing</h2>

                        <p>
                            We provide marketing services to startups and small
                            businesses to looking for a partner of their digital media,
                            design & development, lead generation.
                        </p>
                        <p>
                            It is a long established fact that a reader will be distract
                            ed by the readable content of a page when looking at its layout.
                            The point of using Lorem Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using and content here.
                        </p>

                        <button className={style.button}>see pricing</button>
                    </div>

                </div>
            </section>
            */}

            <TeamBanner members={members}></TeamBanner>

            <CountersBanner counters={counters}></CountersBanner>
            <TestimonialsBanner title="What People Say!" description={text30}
                testimonials={testimonials}></TestimonialsBanner>
        </DefaultLayout >
    )
}
