import DefaultLayout from "../../components/layouts/default-layout"
import Banner_Header from "../../components/banner/banner-header"
import Banner_ScreenShots from "../../components/banner/banner-screenshots";
import FeaturesBanner from "../../components/banner/features-banner";
import SidedImageBanner from "../../components/banner/sided-image-banner";
import CountersBanner from "../../components/banner/counters-banner";
import style from "./styles.module.scss"

export default function Pricing() {
    const title = "Best App For Your Modern Lifestyle.";
    const descri = "We provide marketing services to startups and small businesses to looking for a partner of their digital media, design & development, lead generation and communications requirents.";
    const hashTag = "#Editors Choice App of 2020";

    //banner features
    const features = [
        { title: "This is an awesome feature", description: "dont forget to set the features property" },
        { title: "You can set any icon", description: "Search for an icon on fontawesome and you can set it here", icon: "fas fa-award" },
        { title: "Set up to three elements", description: "Please set exactly three elements on this section", icon: "fas fa-bacterium" }
    ]

    //banner sidedImage
    const descriptionSided = "We provide marketing services to startups and small businesses to looking for a partner of their digital media, design & development, lead generation and communications requirents. We provide marketing services to startups and small businesses to looking for a partner of their digital media and communications requirents.";

    //counters banner
    const counters = [
        { icon: 'fa fa-download', label: 'Total downloaded', value: 2345 },
        { icon: 'fa fa-chart-bar', label: 'Grow on Year', value: 6543 },
        { icon: 'fa fa-star', label: 'Client Reviews', value: 3453 },
        { icon: 'fa fa-bookmark', label: 'People subscribed', value: 3453 }
    ]

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
            <Banner_Header title={title} description={descri} hashtag={hashTag}></Banner_Header>
            <FeaturesBanner
                title="Truno Features"
                description="This is an awesome template for your business"
                features={features}
            ></FeaturesBanner>
            <SidedImageBanner
                backgroundPosition="left"
                title="Simple Proven Way To Boost Your Team Performance."
                description={descriptionSided}
                action={{ link: '#', label: 'GET STARTED', target: '_blank' }}>
                <img style={{ height: "600px", padding: "0 30px" }} src="/img/content-moc-1.png"></img>
            </SidedImageBanner>

            <div className={style.posCounters}>
                <CountersBanner counters={counters}></CountersBanner>
            </div>

            <Banner_ScreenShots titleBanner={titleBanner} descBanner={descBanner} screenshots={screenShots}></Banner_ScreenShots>
        </DefaultLayout>
    )
}
