import style from "./styles.module.scss";
import DefaultLayout from "../../components/layouts/default-layout";
import BrandsBanner from "../../components/banner/brands-banner";
import CountersBanner from "../../components/banner/counters-banner";
import FeaturesBanner from "../../components/banner/features-banner";
import SidedImageBanner from "../../components/banner/sided-image-banner";
import TeamBanner from "../../components/banner/team-banner";
import TestimonialsBanner from "../../components/banner/testimonials-banner";
import DownloadsBanner from "../../components/banner/downloads-banner";
import Banner_Header from "../../components/banner/banner-header";
import Banner_ScreenShots from "../../components/banner/banner-screenshots";
import Banner_Pricing from "../../components/banner/banner-pricing";



export default function Showcase() {

    //brands banner sponsors
    const sponsors = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map(n => `/img/brands/sponsor-${n}.png`);

    //counters banner
    const counters = [
        { icon: 'fa fa-download', label: 'Total downloaded', value: 2345 },
        { icon: 'fa fa-chart-bar', label: 'Grow on Year', value: 6543 },
        { icon: 'fa fa-star', label: 'Client Reviews', value: 3453 },
        { icon: 'fa fa-bookmark', label: 'People subscribed', value: 3453 }
    ]

    //features banner require this
    const title_features = "This is a Title for your features";
    const descri_features = "This is a long description for your services, This is a long description for your services.";
    const features = [
        { title: "This is an awesome feature", description: "dont forget to set the features property" },
        { title: "You can set any icon", description: "Search for an icon on fontawesome and you can set it here", icon: "fas fa-award" },
        { title: "Set up to three elements", description: "Please set exactly three elements on this section", icon: "fas fa-bacterium" }
    ]

    //sided image banner require this
    const title_sidedimage = "The #1 Tool For Creating Stunning Marketing";
    const description_sidedImage = "We provide marketing services to startups and small businesses to looking for a partner of their digital media, design & development, lead generation.";

    //team banner require this
    const title_team = "Our Expert Team";
    const desc_team = "We provide marketing services to startups" +
        " and small businesses to looking for a partner of their " +
        "digital media, design & development, lead generation.";
    const members = [
        { photo: '/img/team/team-1.png', name: 'Fiorella Ibañez', position: 'Designer' },
        { photo: '/img/team/team-2.png', name: 'nombre2 apellido2', position: 'cargo' },
        { photo: '/img/team/team-3.png', name: 'nombre3 apellido3', position: 'Cargo' },
        { photo: '/img/team/team-4.png', name: 'nombre4 apellido4', position: 'CARGO' }
    ]


    //testimonials banner require this
    const title_testimonials = "What People Say!";
    const textRand = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium erat sed rutrum efficitur."

    const testimonials = [
        { avatar: '/img/testi-1.jpg', authorName: 'Eldie Goldey', authorTitle: 'Developer', rating: 4, text: textRand + textRand },
        { avatar: '/img/testi-2.jpg', authorName: 'Peter Scenzency', authorTitle: 'Designer', rating: 3, text: textRand + textRand },
        { avatar: '/img/testi-3.jpg', authorName: 'Fiorella Ibanez', authorTitle: 'Marketer', rating: 4, text: textRand + textRand },
        { avatar: '/img/testi-1.jpg', authorName: 'Laura Fies', authorTitle: 'Architect', rating: 5, text: textRand + textRand },
        { avatar: '/img/testi-2.jpg', authorName: 'Ivan Prince', authorTitle: 'Singer', rating: 4, text: textRand + textRand },
        { avatar: '/img/testi-3.jpg', authorName: 'Michael Thomanson', authorTitle: 'Developer', rating: 5, text: textRand + textRand }
    ]

    //downloads banner require this
    const image = "/img/content-2.png"

    const info = [{
        title: "Download Truno App Now!",
        description: "Make your awesome business idea a reality with Truno, the fresh new theme from Mikado - custom made for modern startups."
    }]

    //banner header require this
    const title_bannerheader = "Best App For Your Modern Lifestyle.";
    const description_bannerheader = "We provide marketing services to startups and small businesses to looking for a partner of their digital media, design & development, lead generation and communications requirents.";
    const hashTag = "#Editors Choice App of 2020"

    //banner screenShots
    const titleBanner = "Truno Screenshots";
    const descBanner = "Make your awesome business idea a reality with Truno, the fresh new theme from Mikado - custom made for modern startups.";
    const screenShots = [
        { shot: '/img/screenShots/app-ss-1.png' },
        { shot: '/img/screenShots/app-ss-2.png' },
        { shot: '/img/screenShots/app-ss-1.png' },
        { shot: '/img/screenShots/app-ss-2.png' },
        { shot: '/img/screenShots/app-ss-1.png' },
        { shot: '/img/screenShots/app-ss-2.png' }
    ]

    return (
        <DefaultLayout>
            <div className={style.title}>
                <h1>Showcase</h1>
            </div>
            <div className={style.text}>Brands Banner</div>
            <BrandsBanner logos={sponsors}></BrandsBanner>

            <div className={style.text}>Counters Banner</div>
            <CountersBanner counters={counters}></CountersBanner>

            <div className={style.text}>Features Banner</div>
            <FeaturesBanner
                title={title_features}
                description={descri_features}
                features={features}
            ></FeaturesBanner>

            <div className={style.text}>Sided Image Banner</div>
            <SidedImageBanner backgroundPosition="right" title={title_sidedimage}
                description={description_sidedImage}
                action={{ link: '#', label: "SEE PRICING", target: '_blank' }}>
                <img style={{ padding: "0 30px" }} src="/img/dashboard-2.png"></img>
            </SidedImageBanner>

            <div className={style.text}>Team Banner</div>
            <TeamBanner
                members={members}
                title={title_team}
                description={desc_team}
            ></TeamBanner>

            <div className={style.text}>Testimonials Banner</div>
            <TestimonialsBanner
                title={title_testimonials}
                description={textRand + textRand}
                testimonials={testimonials}
            ></TestimonialsBanner>

            <div className={style.text}>Downloads Banner</div>
            <DownloadsBanner
                image={image}
                information={info}
            ></DownloadsBanner>

            <div className={style.text}>Banner Header</div>
            <Banner_Header
                title={title_bannerheader}
                description={description_bannerheader}
                hashtag={hashTag}
            ></Banner_Header>

            <div className={style.text}>Banner ScreenShots</div>
            <Banner_ScreenShots 
                titleBanner={titleBanner} 
                descBanner={descBanner} 
                screenshots={screenShots} 
                ssr={true}
            ></Banner_ScreenShots>
            <div className={style.text}>Banner Pricing</div>
            <Banner_Pricing></Banner_Pricing>
        </DefaultLayout>
    )
}
